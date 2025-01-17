/** Server-side global */
require(`dotenv`).config({path: `./config/.env`})
require(`./config/db`)


/** Express */
const express = require(`express`)
const app = express()

//const cors = require(`cors`)

app.use(require(`body-parser`).json())
app.use(require(`cors`)({credentials: true, origin: process.env.LOCAL_HOST}))

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Connected to port ` + process.env.SERVER_PORT)
})

//routes
app.use(require(`./routes/products`))



/** Error 404 */
app.use((
    err,
    req,
    res,
    next) => {

    next(createError(404))
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