/**
 * This script was designed to perform batch inserts into our database, if you need to insert multiple data, check
 * our controller and then create a script like this for the data you want to insert.
 *
 * HOW TO USE:
 *  - After checking/creating controller and creating a new script like this, go to your command line inside the project folder
 *  and type:
 *
 *  `node .\server\scripts\insertProducts.js`
 */


require('dotenv').config({path: '../config/.env'})
require('../config/dbconn')
const {insertProducts} = require('../controllers/productController');

(async () => {
    try {
        await insertProducts()
        console.log('Inserted products successfully')
        process.exit(0)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
})()