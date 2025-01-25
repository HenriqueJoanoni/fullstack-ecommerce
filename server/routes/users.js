const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY, 'utf8')

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
            user_password: hash,
            user_access_level: 2,
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
            name: user.first_name,
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
router.post("/logout", (req, res) => {
    res.json({})
})

router.get("/users", async (req, res) => {
    try {
        const users = await User.find({})
        console.log(users)
        res.json(users)
    } catch (err) {
        console.error(err)
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router
