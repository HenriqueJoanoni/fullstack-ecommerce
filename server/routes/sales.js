const router = require(`express`).Router()
const salesModel = require('../models/Sales')
const userModel = require('../models/User')
const verifyTokenPassword = require("../middlewares/verifyUserJWTPassword")

router.post('/sales', verifyTokenPassword, async (req, res, next) => {
    try {
        const { orderID, products, total, user_email } = req.body;

        if (!orderID || !products || !total || !user_email) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const user = await userModel.findOne({ user_email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        const saleProducts = products.map(product => ({
            product: product.productId,
            quantity: product.quantity,
            price: product.price
        }));

        const newSale = await salesModel.create({
            paypalPaymentID: orderID,
            products: saleProducts,
            total: parseFloat(total),
            sale_date: new Date().toISOString(),
            user: user._id
        });

        return res.status(201).json({
            success: true,
            sale: newSale
        });

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
