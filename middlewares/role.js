function checkRole(req, res, next) {
    if (!req.user.role) {
        return res.status(403).json("Forbidden to access this")
    }
    next()
}

module.exports = checkRole