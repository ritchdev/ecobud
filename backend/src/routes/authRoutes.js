import express from 'express'
import { googleLogin } from "../controllers/authcontroller.js"
import { protect } from '../middleware/authMiddleware.js'

const authRouter = express.Router();
// The frontend sends the Firebase ID Token in the Authorization header
// The 'protect' middleware verifies it and creates/finds the user
authRouter.post('/google-login', protect, googleLogin);

export { authRouter }
