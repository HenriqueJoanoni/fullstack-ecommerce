const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const fs = require(`fs`)
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY, 'utf8')
const logout = require("../middlewares/logoutMiddleware")
const verifyTokenPassword = require("../middlewares/verifyUserJWTPassword")

const multer  = require('multer')
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})



/* Fetch all users */
router.get(`/allUsers`, async(req, res)=>{
    await User.find((error, data)=> {
        if (data){
            res.json(data)
        } else {
            console.log(data)
            res.json(error)
        }
    })
})



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
            join_date: new Date(),
            user_profile_picture: "blank_profile_pic.png"
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
            profileURL: newUser.user_profile_picture,
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
            profileURL: user.user_profile_picture,
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



//get user profile photo
router.get("/profile/photo/:url", async(req, res) => {
    await fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.url}`, `base64`, (err, fileData)=> {
        if (fileData){
            res.json({profilePhoto: fileData})
        } else {
            res.json({errorMessage: err})
        }
    })
})


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

/** UPDATE USER INFO */
router.post("/profile-update", verifyTokenPassword, async (req, res) => {
    try {
        const {firstName, lastName, phone, email, password, photoURL} = req.body
        const user = await User.findOne({user_email: req.decodedToken.email})

        if (!user) {
            return res.status(404).json({error: "User not found"})
        }

        let updateFields = {
            first_name: firstName,
            last_name: lastName,
            user_phone: phone,
            user_email: email,
            user_profile_picture: photoURL
        }

        if (password) {
            updateFields.user_password = await bcrypt.hash(password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS))
        }

        await User.updateOne(
            {user_email: req.decodedToken.email},
            {$set: updateFields}
        )

        const  updatedUserData = await User.findOne({user_email: email}, "-password")

        res.status(200).json({
            message: "Profile Updated Successfully",
            updatedUserData: updatedUserData
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
})


//update profile picture
router.post("/profile/imgUpload", upload.single("profile_photo"), (req, res)=> {
    if (!req.file){
            res.json({errorMessage: "No file selected"})
        }
        else if(req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg"){ 
            fs.unlink(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, (error) => {res.json({errorMessage:`Only .png, .jpg and .jpeg format accepted`})})                
        }

        else {
            //successful
            res.json({url: req.file.filename})
        }
})

router.delete("/profile/imgDelete/:filename", (req, res)=> {
    fs.unlink(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`, (err)=>{console.log(err);res.json({errorMessage: err})})
})


router.delete("/delete/:_id", (req, res) => {
    User.findByIdAndRemove(req.params._id, (error, data)=>{
        if (data){
            res.json(data)
        } else {
            res.json(error)
        }
    })
})

module.exports = router
