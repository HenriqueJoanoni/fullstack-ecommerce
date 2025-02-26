const router = require(`express`).Router()
const productsModel = require(`../models/Product`)
const multer  = require('multer')
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})
const fs = require(`fs`)
//const emptyFolder = require(`empty-folder`)



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


/* image routes */

router.post("/products/imageUpload", upload.single("product_photo"), (req, res) => {
    if (!req.file){
        res.json({errorMessage: "No file selected"})
    }
    else if(req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg"){ 
        fs.unlink(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, (error) => {res.json({errorMessage:`Only .png, .jpg and .jpeg format accepted`})})                
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
       if (fileData){
        res.json({data: fileData})
       } else {
        res.json({errorMessage: err})
       }
    })
})

router.delete("/products/image/:filename", (req, res) => {
    //delete file from server side
    fs.unlink(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`, (err) => {
        if (err){
            console.log("delete server error")
            console.log(err)
            res.json({errorMessage: err})
        } 
    })
})  


/*
emptyFolder(process.env.UPLOADED_FILES_FOLDER, false, (result) =>
{
    return result
})

*/


module.exports = router