const mongoose = require('mongoose')

const saleSchema = new mongoose.Schema({
    paypalPaymentID: {type: String, required: true},
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    sale_price: {type: Number, required: true},
    sale_date: {type: String, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    collection: 'sales'
},)

module.exports = mongoose.model('Sales', saleSchema)