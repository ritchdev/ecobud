import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { getUserProfile, awardCertificate } from "../controllers/userController.js"

const userRouter = express.Router()

userRouter.get('/', (req, res) => res.send("At user router"))
userRouter.get('/profile', protect, getUserProfile)
userRouter.post("/certificates/award", protect, awardCertificate);


export { userRouter }