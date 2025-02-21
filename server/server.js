/** Server-side global */
require(`dotenv`).config({path: `./config/.env`})
require(`./config/dbconn`)


/** Import Routes */
const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products')
const saleRoutes = require('./routes/sales')


/** Express */
const express = require(`express`)
const app = express()
app.use(express.json())


/** Middleware */
app.use(require(`body-parser`).json())
app.use(require(`cors`)({credentials: true, origin: process.env.LOCAL_HOST}))

/** multer */
const multer = require(`multer`)
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})


/** Routes */
app.use(userRoutes)
app.use(productRoutes)
app.use(saleRoutes)


/** Start the Server */
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Connected to port ` + process.env.SERVER_PORT)
})

/** Mailer */
const nodemailer = require('nodemailer');
const cors = require('cors');
app.use(cors());

app.post("/send-email", async (req, res) => {
    const {name, email, message} = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    })

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "henrique.joanoni@gmail.com",
        subject: `New contact submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    }

    try {
        await transporter.sendMail(mailOptions)
        res.json({message: "Email sent successfully."})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Error sending email."})
    }
})
app.listen(5000, () => console.log("Server running on port 5000"))


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