import { User } from '../models/user.js'

// @desc    Auth user with Firebase Token (Login/Register Sync)
// @route   POST /api/auth/google-login
// @access  Protected (by Firebase Middleware)
const googleLogin = async (req, res) => {
  // Middleware has already verified the token and attached req.user
  // We just return the user profile and our own JWT if we wanted (or just use Firebase token)
  // Here we just acknowledge the login and return profile data

  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
    points: req.user.points,
    badges: req.user.badges,
    message: "Firebase Login Successful"
  });
};

export { googleLogin }
