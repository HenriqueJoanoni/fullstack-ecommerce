const router = require(`express`).Router()
const salesModel = require('../models/Sales')
const userModel = require('../models/User')
const verifyTokenPassword = require("../middlewares/verifyUserJWTPassword")

router.post('/sales', verifyTokenPassword, async (req, res, next) => {
    try {
        const { orderID, productId, price, user_email } = req.body;

        const user = await userModel.findOne({ user_email: user_email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const newSale = await salesModel.create({
            paypalPaymentID: orderID,
            product: productId,
            sale_price: price,
            sale_date: Date.now().toString(),
            user: user._id
        });

        return res.json({ success: true, sale: newSale });
    } catch (error) {
        next(error);
    }
});

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
