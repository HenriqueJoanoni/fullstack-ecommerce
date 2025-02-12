const router = require(`express`).Router()
const productsModel = require(`../models/Product`)
const {formatDate} = require("../utils/utils")

//read all records of products
router.get(`/products`, (req, res) => {
    productsModel.find((error, data) => {
        if (data) {
            res.json(data)
        } else {
            console.log(error)
            res.json(error)
        }
    })
})

//find an individual product with id
router.get(`/products/:_id`, (req, res) => {
    productsModel.findOne({_id: `${req.params._id}`}, (error, data) => {
        if (data) {
            res.json(data)
        } else {
            console.log(error)
            res.json(data)
        }
    })
})

/** NEW PRODUCTS ROUTE */
router.get(`/new-products`, async (req, res) => {
    try {
        const newProducts = await productsModel.find({is_new: true}).limit(4)
        if (!newProducts) {
            return res.status(404).json({message: 'No new products found'})
        }
        res.status(200).json(newProducts)
    } catch (error) {
        res.status(500).json({message: "Error retrieving products.", error})
    }
})

/** DEAL PRODUCTS */
router.get('/deal-products', async (req, res) => {
    try {
        const products = await productsModel.find({"product_deal.is_deal": true})
        const options = {day: 'numeric', year: 'numeric', month: 'numeric'};

        if (!products) {
            return res.status(404).json({message: "No deal products found."})
        }

        const formattedProducts = products.map(product => ({
            _id: product._id,
            product_sku: product.product_sku,
            product_name: product.product_name,
            product_description: product.product_description,
            product_price: product.product_price,
            product_picture: product.product_picture,
            product_category: product.product_category,
            product_brand: product.product_brand,
            product_tags: product.product_tags,
            is_available: product.is_available,
            is_new: product.is_new,
            product_deal: {
                is_deal: product.product_deal.is_deal,
                discount_price: product.product_deal.discount_price,
                deal_deadline: formatDate(product.product_deal.deal_deadline, options),
            }
        }))

        res.status(200).json(formattedProducts)
    } catch (error) {
        res.status(500).json({message: "Error retrieving products.", error})
    }
})

router.post("/new-product", async (req, res) => {
    try {
        const product = req.body
        const newProduct = new Product(product)
        const savedProduct = await newProduct.save()
        res.status(201).json(savedProduct)
    } catch (error) {
        console.log(error)
        res.status(400).send({error: error.message})
    }
})

module.exports = router