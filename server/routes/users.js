const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY, 'utf8')
const logout = require("../middlewares/logoutMiddleware")
const verifyTokenPassword = require("../middlewares/verifyUserJWTPassword")

/** REGISTER ROUTE */
router.post('/register', async (req, res) => {
    try {
        const {firstName, lastName, email, password, confirm_password, redirect} = req.body

        const existingUser = await User.findOne({user_email: email})
        if (existingUser) {
            return res.status(409).json({error: "User already exists"})
        }

        if (password !== confirm_password) {
            return res.status(400).json({error: "Passwords don't match"})
        }

        const hash = await bcrypt.hash(password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS))

        const newUser = await User.create({
            first_name: firstName,
            last_name: lastName,
            user_email: email,
            user_phone: "",
            user_password: hash,
            user_profile_picture: "",
            user_access_level: 1,
            token: "",
        })

        newUser.token = jwt.sign(
            {
                email: newUser.user_email,
                accessLevel: newUser.user_access_level,
            },
            JWT_PRIVATE_KEY,
            {algorithm: "HS256", expiresIn: process.env.JWT_EXPIRY}
        )
        await newUser.save()

        res.status(201).json({
            name: `${newUser.first_name} ${newUser.last_name}`,
            email: newUser.user_email,
            accessLevel: newUser.user_access_level,
            token: newUser.token,
            redirect: redirect || "/login",
        })
    } catch (err) {
        console.error("Error during registration:", err)
        res.status(500).json({error: "Internal server error"})
    }
})

/** LOGIN ROUTE */
router.post("/login", async (req, res) => {
    const {email, password, redirect} = req.body

    try {
        const user = await User.findOne({user_email: email})
        console.log(user)

        if (!user) {
            return res.status(404).json({error: "User not found"})
        }

        const isPasswordValid = await bcrypt.compare(password, user.user_password)
        if (!isPasswordValid) {
            return res.status(401).json({error: "Invalid email or password"})
        }

        const token = jwt.sign(
            {
                email: user.user_email,
                accessLevel: user.user_access_level,
            },
            JWT_PRIVATE_KEY,
            {
                algorithm: "HS256",
                expiresIn: process.env.JWT_EXPIRY,
            }
        )

        res.status(200).json({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.user_email,
            phone: user.user_phone,
            accessLevel: user.user_access_level,
            token: token,
            redirect: redirect || "/",
        })
    } catch (error) {
        console.error("Error during login:", error)
        res.status(500).json({error: "Internal server error"})
    }
})

/** LOGOUT ROUTE */
router.post("/logout", logout)

/***********************************
 *          PROTECTED ROUTES       *
 * *********************************/

/** OPEN USER PROFILE */
router.get("/profile", verifyTokenPassword, async (req, res) => {
    try {
        const user = await User.findOne({user_email: req.decodedToken.email})
        console.log({
            "LOGGED USER: ": user
        })

        if (!user) {
            return res.status(404).json({error: "User not found"})
        }

        res.json({
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.user_email,
            phone: user.user_phone,
            accessLevel: user.user_access_level,
            user: req.decodedToken
        })
    } catch (error) {
        console.log("Error fetching user profile: ", error)
        res.status(500).json({error: "Internal server error"})
    }
})

module.exports = router
