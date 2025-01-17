const router = require(`express`).Router()
const productsModel = require(`../config/models/products`)



//read all records of products
router.get(`/products`, (req, res) => 
{
    productsModel.find((error, data) => {
        if (data){
            res.json(data)
        } else {
            console.log(error)
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

module.exports = router