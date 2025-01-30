/** Server-side global */
require(`dotenv`).config({path: `./config/.env`})
require(`./config/dbconn`)


/** Import Routes */
const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products')


/** Express */
const express = require(`express`)
const app = express()
app.use(express.json())


/** Middleware */
app.use(require(`body-parser`).json())
app.use(require(`cors`)({credentials: true, origin: process.env.LOCAL_HOST}))


/** Routes */
app.use(userRoutes)
app.use(productRoutes)


/** Start the Server */
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Connected to port ` + process.env.SERVER_PORT)
})


/** Error 404 */
app.use((
    req,
    res,
    next) => {

    const error = new Error("Not Found")
    error.statusCode = 404
    next(error)
})


/** Other Errors */
app.use(function (
    err,
    req,
    res,
    next) {

    console.error(err.message)
    if (!err.statusCode) {
        err.statusCode = 500
    }
    res.status(err.statusCode).send(err.message)
})