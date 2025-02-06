const jwt = require("jsonwebtoken")
const fs = require("fs")
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY, 'utf8')

const verifyJwtPassword = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({error: "Unauthorized - no token provided"})
    }

    const token = authHeader.split(" ")[1]

    jwt.verify(token, JWT_PRIVATE_KEY, {algorithms: ["HS256"]}, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({error: "Unauthorized - invalid token"})
        }

        req.decodedToken = decodedToken
        next()
    })
}

module.exports = verifyJwtPassword