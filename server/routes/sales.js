const router = require(`express`).Router()
const salesModel = require(`../models/Sale`)
const verifyTokenPassword = require("../middlewares/verifyUserJWTPassword")

router.get(`/purchasesByUserID/:_id`, async (req, res) => {   
    console.log("here")
    await salesModel.find({userID:req.params._id}, async (error, data) => {
        if (data){
            res.json(data)
        } else {
            res.json(error)
        }
    })
})




router.get(`/allSales`, (req, res) => {
    salesModel.find((error, data) => {
        if (data){
            res.json(data)
        } else {
            res.json(error)
        }
    })
})

module.exports = router
