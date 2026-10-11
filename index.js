const express = require("express")
const app = express()
// app.set("views", "pug")
const mongoose = require("mongoose")
// const logger = require("./middlewares/logger.js")
const helmet = require("helmet")
const morgan = require("morgan")

const appDebugger = require("debug")("app:mainapp")
const dbDebugger = require("debug")("app:dbInfo")
const homeRoute = require("./routes/home.js")
const songRoute = require("./routes/songs.js")
const SongModel = require("./models/song.js")
const userRoute = require("./routes/register.js")
const loginRoute = require("./routes/login.js")
const bcrypt = require("bcrypt")
const winston = require("winston")
require("winston-mongodb")
const error = require("./middlewares/error.js")
const cors = require("cors")

app.use(cors())
app.use(express.json())
// app.use(logger)
// app.use(express.static("public"))
app.use(helmet())
app.use("/", homeRoute)
app.use("/songs", songRoute)
app.use("/register", userRoute)
app.use("/login", loginRoute)
app.use(error)



if (!process.env.songJwtKey) {
    winston.error('FATAL ERROR: jwtSecretKey is not defined.');
}


if (app.get("env") === "development") {
    app.use(morgan("tiny"))
    appDebugger("morgan is enabled...")
}

const dbPassword = process.env.DBPASSWORD
const dbConnect = `mongodb+srv://vchuks4all_db_user:${dbPassword}@cluster0.uwbbtpc.mongodb.net/songCollection`
mongoose.connect(dbConnect)
    .then(() => {
        winston.log("info", "Database connected...")
    })
    .catch((err) => {

        winston.add(new winston.transports.MongoDB({ db: dbConnect }))
        winston.error("dberror", err)
    })

const port = process.env.PORT || 4003
app.listen(port, () => appDebugger(`This is on port ${port}`))

