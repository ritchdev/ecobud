import { User } from "../models/user.js"
import ApiError from "../utils/ApiError.js"

class RegisterValidator {
    constructor({ username, email, password }) {
        this.username = username,
            this.email = email,
            this.password = password
    }

    checkEmptyFields() {
        if (this.username.trim() === "")
            throw new ApiError(400, "Username cannot be empty")
        else if (this.email.trim() === "")
            throw new ApiError(400, "Email cannot be empty")
        else if (this.password.trim() === "")
            throw new ApiError(400, "Password cannot be empty")
    }

    emptyFields() {
        if (this.username.trim() === "")
            throw new ApiError(400, "Username cannot be empty")
        else if (this.password.trim() === "")
            throw new ApiError(400, "Password cannot be empty")
    }

    validateEmail() {
        if (!(this.email.includes("@") && (this.email.lastIndexOf(".") > this.email.lastIndexOf("@"))))
            throw new ApiError(400, "Invalid Email Address")
    }

    validatePassword() {
        let hasUpper = false, hasLower = false, hasNumber = false, hasSpecial = false
        let chars = Array.from(this.password)

        hasUpper = chars.some((char) => /[A-Z]/.test(char))
        hasLower = chars.some((char) => /[a-z]/.test(char))
        hasNumber = chars.some((char) => /[0-9]/.test(char))
        hasSpecial = chars.some((char) => /[^a-zA-Z0-9]/.test(char))

        if (!(hasSpecial && hasLower && hasUpper && hasNumber))
            throw new ApiError(400, "Password does not meet requirements")
    }

    validateUsername() {
        let chars = Array.from(this.username)

        if (chars.some((char) => /[^a-z0-9]/.test(char)))
            throw new ApiError(400, "Username may only contain lowercase letters and numbers")
    }

    async checkDuplicate() {
        if (await User.findOne({ email: this.email }) != null)
            throw new ApiError(409, "Email already in use!")
        else if (await User.findOne({ username: this.username }) != null)
            throw new ApiError(409, "Username already exists!")
    }
}

class LoginValidator {
    constructor({ username, password }) {
        this.username = username,
            this.password = password
    }

    checkEmptyFields() {
        if (this.username.trim() === "")
            throw new ApiError(400, "Username cannot be empty")
        else if (this.password.trim() === "")
            throw new ApiError(400, "Password cannot be empty")
    }

    async verifyDetails() {
        const existingUser = await User.findOne({ username: this.username })
        if (!existingUser)
            throw new ApiError(404, "Username does not exist!")

        const correctPassword = await existingUser.isPasswordCorrect(this.password)
        if (!correctPassword)
            throw new ApiError(401, "Incorrect Password.")

        //Only executed if the username is found and the password entered by the user is correct
        return (existingUser._id)
    }

}




export { RegisterValidator, LoginValidator }

