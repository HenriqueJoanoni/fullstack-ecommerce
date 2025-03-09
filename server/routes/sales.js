const router = require(`express`).Router()
const salesModel = require('../models/Sales')
const userModel = require('../models/User')
const formatDate = require('../utils/utils')
const verifyTokenPassword = require("../middlewares/verifyUserJWTPassword")

router.post('/sales', verifyTokenPassword, async (req, res, next) => {
    try {
        const { orderID, products, total, user_email } = req.body;

        if (!orderID || !products || !total || !user_email) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
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
            price: product.price,
            product_name: product.productName,
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
    try {
        const data = await salesModel.find({ user: req.params._id });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/detailedPurchasesByUserID/:_id", async (req, res) => {
    try {
        const sales = await salesModel.find({ user: req.params._id })
            .sort({ sale_date: -1 })
            .exec();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get(`/allSales`, (req, res) => {
    salesModel.find()
        .populate('user', 'first_name last_name')
        .exec((error, data) => {
            if (error) return res.status(500).json({ error });
            const plainData = data.map(doc => doc.toObject());

            const transformedData = plainData.map(sale => ({
                purchaserID: sale.user?._id || null,
                purchaserName: sale.user ?
                    `${sale.user.first_name} ${sale.user.last_name}` : 'Deleted User',
                sale_date: new Date(sale.sale_date).toISOString(),
                items: sale.products.map(product => ({
                    product_name: product.product_name,
                    price: product.price,
                    qty: product.quantity
                })),
                purchase_total: sale.total,
                _id: sale._id,
                paypalPaymentID: sale.paypalPaymentID
            }));

            res.json(transformedData);
        });
});

module.exports = router
