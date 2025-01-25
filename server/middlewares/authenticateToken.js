const jwt = require("jsonwebtoken")

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]
    if (!token) {
        return res.status(401).json({error: "Access denied"})
    }

    try {
        req.user = jwt.verify(token, process.env.SECRET_KEY)
        next()
    } catch (err) {
        res.status(403).json({error: err})
    }
}

module.exports = authenticateToken