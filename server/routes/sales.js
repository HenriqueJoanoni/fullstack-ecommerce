const router = require(`express`).Router()
const salesModel = require('../models/Sales')
const userModel = require('../models/User')
const verifyTokenPassword = require("../middlewares/verifyUserJWTPassword")

router.post('/sales', verifyTokenPassword, async (req, res, next) => {
    const {orderID, productId, price, user_email} = req.body

    let userPurchase = userModel.findOne({user_email: user_email})
        .populate("user_data")

    await salesModel.create({
        paypalPaymentID: orderID,
        product: productId,
        sale_price: price,
        sale_date: Date.now(),
        user: userPurchase.user_data._id
    })

    return res.json({success: true})
})

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
