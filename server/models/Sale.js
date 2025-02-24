const mongoose = require(`mongoose`)

const saleSchema = new mongoose.Schema({
    paypalPaymentID: {type: String, required: true},
    items: {type: Array, required: true},
    userID: {type: String, required: true},
    sale_date: {type: Date},
}, {
    collection: `sales`
})

module.exports = mongoose.model(`Sale`, saleSchema)