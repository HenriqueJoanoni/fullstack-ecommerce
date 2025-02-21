const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_picture: {type: Array},
    product_sku: {type: String, required: true},
    product_name: {type: String},
    product_description: {type: String},
    product_price: {type: Number},
    is_available: {type: Boolean, default: false},
    product_deal: {
        is_deal: {type: Boolean, default: false},
        discount_price: {type: Number, required: true},
        deal_deadline: {type: Date, required: true},
    },
    product_category: {type: String},
    product_brand: {type: String},
    qty_in_stock: {type: Number},
    product_tags: {type: Array}
}, {
    collection: 'products'
})

module.exports = mongoose.model('Product', productSchema)