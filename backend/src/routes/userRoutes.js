const express = require("express")
const userRouter = express.Router()

userRouter.get('/login', (req, res) => {console.log("get login")})
userRouter.get('/register', (req, res) => {console.log("get register")})
userRouter.get('/logout', (req, res) => {console.log("get logout")})

module.exports = userRouter