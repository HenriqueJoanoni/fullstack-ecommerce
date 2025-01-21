const mongoose = require(`mongoose`)

let productsSchema = new mongoose.Schema(
    {
        product_deal: {
            is_deal: {type: Boolean},
            discount_price: {type: Number},
            deal_deadline: {
                $date: {type: Date}
            }
        },
        
        product_picture: [{type: String}],
        is_available: {type: Boolean, required:true},
        product_sku: {type: String},
        product_name: {type: String, required: true},
        product_description: {type: String},
        product_price: {type: Number, required:true},
        product_category: {type: String},
        product_brand: {type: String},
        __v: {type: Number}
    },
    {
        collections: `products`
    })

module.exports = mongoose.model(`products`, productsSchema)

