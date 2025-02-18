const router = require('express').Router();
const salesModel = require('../models/sales');
const productsModel = require('../models/Product'); 
const { formatDate } = require("../utils/utils");

const createNewSaleDocument = (req, res, next) => {
    let saleDetails = new Object();

    saleDetails.paypalPaymentID = req.params.orderID;
    saleDetails.productID = req.params.productId;
    saleDetails.price = req.params.price;

    productsModel.findByIdAndUpdate({ _id: req.params.productId }, { is_available: false }, (err, data) => {
        if (err) {
            return next(err);
        }
    });

    salesModel.create(saleDetails, (err, data) => {
        if (err) {
            return next(err);
        }
    });

    return res.json({ success: true });
};

router.post('/sales/:orderID/:productId/:price', createNewSaleDocument);

module.exports = router;
