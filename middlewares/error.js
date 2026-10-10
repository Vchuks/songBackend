const winston = require("winston")

function error(err, req, res, next) {

    const logger =
        winston.createLogger({
            transports: [
                new winston.transports.File({ filename: "errorlog.log", level: "error" }),

                new winston.transports.Console({ level: "info", format: winston.format.json() })
            ],
            exceptionHandlers: [
                new winston.transports.File({ filename: "exceptionlog.log" })
            ]
        })

    logger.error("route handling error", err)
    return res.status(500).json("Something failed")
}

module.exports = error