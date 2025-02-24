const router = require(`express`).Router();
const salesModel = require('../models/Sales');
const productsModel = require('../models/Product');
const { formatDate } = require("../utils/utils");
const verifyTokenPassword = require("../middlewares/verifyUserJWTPassword")

const createNewSaleDocument = (req, res, next) => {
    let saleDetails = new Object();

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

    saleDetails.paypalPaymentID = req.params.orderID;
    saleDetails.productID = req.params.productId;
    saleDetails.price = req.params.price;

    productsModel.findById({ _id: req.params.productId }, { is_available: false }, (err, data) => {
        if (err) {
            return next(err);
        }
    });

    salesModel.create({
        paypalPaymentID: req.params.paypalPaymentID,
        product: "",
        sale_price: "",
        sale_date: "",
        user: ""
    })

    salesModel.create(saleDetails, (err, data) => {
        if (err) {
            return next(err);
        }
    });

    return res.json({ success: true });
};

router.post('/sales/:orderID/:productId/:price', verifyTokenPassword, createNewSaleDocument);

router.get(`/allSales`, (req, res) => {
    salesModel.find((error, data) => {
        if (data){
            res.json(data)
        } else {
            res.json(error)
        }
    })
})


module.exports = router;
