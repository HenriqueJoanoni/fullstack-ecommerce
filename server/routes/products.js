const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

router.get("/products", async (req, res) => {
    try {
        const products = await Product.find({})
        console.log(products)
        res.json(products)
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
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