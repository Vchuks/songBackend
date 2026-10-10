function log(res, req, next) {
    console.log("Log everything")
    next()
}

module.exports = log