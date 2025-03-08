const router = require(`express`).Router()
const productsModel = require(`../models/Product`)
const multer = require('multer')
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})
const fs = require(`fs`)
const {formatDate} = require("../utils/utils")

//read all records of products
router.get(`/products`, (req, res) => {
    productsModel.find((error, data) => {
        if (data) {
            res.json(data)
        } else {
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

router.post("/product", (req, res) => {
    console.log(req.body)
    productsModel.create(req.body, (error, data) => {
        if (res.data) {
            console.log(data)
            res.json(data)
        } else {
            res.json(error)
            console.log(error)
        }
    })
})

//edit product
router.put("/products/:_id", (req, res) => {
    //update DB
    productsModel.findByIdAndUpdate(req.params._id, {$set: req.body}, (error, data) => {
        console.log(req.body)
        if (data) {
            res.json(data)
        } else {
            res.json(error)
        }
    })

})


router.delete("/products/:_id", (req, res) => {
    console.log(req.params._id)
    productsModel.findByIdAndRemove(req.params._id, (error, data) => {
        if (error) {
            res.json(error)
        } else {
            res.json(data)
        }
    })
})


/* image routes */
router.post("/products/imageUpload", upload.single("product_photo"), (req, res) => {
    if (!req.file) {
        res.json({errorMessage: "No file selected"})
    } else if (req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg") {
        fs.unlink(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, (error) => {
            res.json({errorMessage: `Only .png, .jpg and .jpeg format accepted`})
        })
    }
    //valid upload
    else {
        res.json({url: req.file.filename})
        //learned from mongo docs
        //https://www.mongodb.com/docs/manual/reference/operator/update/push/#mongodb-update-up.-push
        /*
        productsModel.updateOne({_id: req.params._id}, {$push: {product_images: req.file.filename}}, (updateErr, updateData) => {
            if (updateData){
                res.json({data: updateData})
            } else {
                res.json({errorMessage: updateErr})
            }
        })
            */
    }
})

router.get("/products/image/:filename", async (req, res) => {
    await fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`, `base64`, (err, fileData) => {
        if (fileData) {
            res.json({data: fileData})
        } else {
            res.json({errorMessage: err})
        }
    })
})

router.get("/products/productFirstImage/:_id", async (req, res) => {
    productsModel.findOne({_id: req.params._id}, (dbErr, dbData) => {
        console.log(dbData)
        console.log(dbErr)
        if (dbData) {
            console.log(dbData)
            fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${dbData.product_images[0]}`, `base64`, (fileErr, fileData) => {
                if (fileData) {
                    res.json(fileData)
                } else {
                    res.json(fileErr)
                }
            })
        } else {
            res.json(dbErr)
        }
    })
})

router.delete("/products/image/:filename", (req, res) => {
    //delete file from server side
    fs.unlink(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`, (err) => {
        if (err) {
            console.log("delete server error")
            console.log(err)
            res.json({errorMessage: err})
        }
    })
})

module.exports = router