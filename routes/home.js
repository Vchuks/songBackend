const express = require("express")
const router = express.Router()
const { User } = require("../models/user")
const authMiddleware = require("../middlewares/auth")
const _ = require("lodash")

router.get("/", (req, res) => {
    res.send("Hello")
    res.end()
})

router.get("/me", authMiddleware, async (req, res) => {
    const getUser = await User.findById(req.user.id)
    res.json(_.pick(getUser,["name", "email", "_id"]))
})

module.exports = router