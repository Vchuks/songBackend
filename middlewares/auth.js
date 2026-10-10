const jwt = require("jsonwebtoken")


function authourizeUser(req, res, next) {
    const getToken = req.header("x-token")
    try {

        if (!getToken) {
            return res.status(401).send("Token required")
        }
        const verifyToken = jwt.verify(getToken, process.env.songJwtKey)
        req.user = verifyToken
        next()
    } catch (ex) {
        return res.status(400).json("Invalid token")
    }
}

module.exports = authourizeUser