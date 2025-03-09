const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
    paypalPaymentID: {type: String, required: true},
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number,
        price: Number,
        product_name: String,
    }],
    total: {type: Number, required: true},
    sale_date: {type: Date, default: Date.now},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
        default: null,
    }
}, {collection: 'sales'})

module.exports = mongoose.model('Sales', saleSchema)