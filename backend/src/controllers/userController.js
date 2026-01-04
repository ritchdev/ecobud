import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError.js"
import { User } from "../models/user.js"
import ApiResponse from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { RegisterValidator, LoginValidator } from "../validators/userValidators.js"

var cookieExpiry = new Date()
cookieExpiry = cookieExpiry.setDate(cookieExpiry.getDate() + process.env.REFRESH_TOKEN_EXPIRY)
const options = {
    httpOnly: true,
    secure: true,
    expires: cookieExpiry
}

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findOne(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Encountered an error while generating Tokens")
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body

    const validateUser = new RegisterValidator({ username, email, password })

    validateUser.checkEmptyFields()
    validateUser.validateUsername()
    validateUser.validateEmail()
    validateUser.validatePassword()
    await validateUser.checkDuplicate()

    const user = await User.create({
        username,
        email,
        password
    })

    await user.save()
    const userId = user._id
    const userCreated = await User.findById(userId).select(" -password -refreshToken ")
    if (!userCreated)
        throw new ApiError(500, "Something went wrong while registering the user profile")

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(userId)

    res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            201,
            "User registered successfully",
            {
                userCreated, userId, accessToken, refreshToken
            }
        )
    )
    //Redirect user to dashboard
})

const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    const validateUser = new LoginValidator({ username, password })
    validateUser.checkEmptyFields()

    const targetId = await validateUser.verifyDetails()

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(targetId)

    const loggedInUser = await User.findById(targetId).select("-password -refreshToken")

    res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, "Login Successful", { loggedInUser, targetId, accessToken, refreshToken })
        )
    //Redirect user to dashboard
})

const logoutUser = asyncHandler(async (req, res) => {
    //  Reset refreshToken assigned to the user in the db
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }
    )

    res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, "User Logged Out Successfully", {})
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
    const clientRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    if (!clientRefreshToken)
        throw new ApiError(400, "No refresh token found")
    
    const decodedToken = jwt.verify(clientRefreshToken, process.env.REFRESH_TOKEN_SECRET)
    const userId = decodedToken?._id;
    
        const userRefreshToken = await User.findById(userId).select("refreshToken")
        if (!userRefreshToken)
            throw new ApiError(401, "Invalid refresh token")
    
        if(clientRefreshToken !== userRefreshToken)
            throw new ApiError(401, "Invalid Refresh Token. Please Login again.")
    
        const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(userId)
    
        res
        .statusCode(200)
        .cookie("accessToken", accessToken, options)    // Overwrites cookie with the same name
        .cookie("refreshToken", refreshToken, options)  // Overwrites cookie with the same name
        .json(
            new ApiResponse(
                200,
                "New Tokens Generated Successfully",
                {accessToken, refreshToken}
            )
        )
    } catch (error) {
        throw new ApiError(400, "Something Went Wrong while refreshing Access Token")
    }
})

export { registerUser, loginUser, logoutUser, refreshAccessToken }