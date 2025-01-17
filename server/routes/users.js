const express = require("express")
const router = express.Router()
const User = require("../models/User")

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
