const router = require(`express`).Router()
const productsModel = require(`../models/Product`)



//read all records of products
router.get(`/products`, (req, res) => 
{
    productsModel.find((error, data) => {
        if (data){
            res.json(data)
        } else {
            res.json(error)
        }
    })
})

//find an individual product with id
router.get(`/products/:_id`, (req, res) => {
    productsModel.findOne({_id:`${req.params._id}`}, (error, data)=>{
        if (data){
            res.json(data)
        } else {
            console.log(error)
            res.json(data)
        }
    })
})

/*
router.post("/new-product", async (req, res) => {
try {
    const product = req.body
    const newProduct = new Product(product)
    const savedProduct = await newProduct.save()
    res.status(201).json(savedProduct)
} catch (error) {
    console.log(error)
    res.status(400).send({error: error.message})
}})
*/

router.post("/product", (req, res) => {
    console.log(req.body)
    productsModel.create(req.body, (error, data) => {
        if (res.data){
            console.log(data)
            res.json(data)
        } else {
            res.json(error)
            console.log(error)
        }
    })
})

//edit product
router.put("/products/:_id", (req, res)=>{
    //update DB
    productsModel.findByIdAndUpdate(req.params._id, {$set: req.body}, (error, data) => {
        console.log(req.body)
        if (data){
            res.json(data)
        } else {
            res.json(error)
        }
    })
    
})


router.delete("/products/:_id", (req, res)=>{
    console.log(req.params._id)
    productsModel.findByIdAndRemove(req.params._id, (error, data) => {
        if (error){ 
            res.json(error)
        } else {
            res.json(data)
        }
    })
})


module.exports = router