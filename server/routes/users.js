const router = require("express").Router()
const User = require("../models/User")

/** Read all records */
User.find({}, (err, users) => {
    if (err) throw err;
    console.log(users)
})