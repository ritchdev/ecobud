const express = require("express")
const protect = require('../middleware/authMiddleware')
const {
    getUserProfile,
    toggleLearningItemStatus,
    awardCertificate
} = require("../controllers/userController")

const userRouter = express.Router()

userRouter.get('/profile', protect, getUserProfile)
router.post("/learning/toggle", protect, toggleLearningItemStatus);
router.post("/certificates/award", protect, awardCertificate);


module.exports = userRouter