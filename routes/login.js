const express = require("express")
const router = express.Router()
const { User } = require("../models/user")
const Joi = require("joi")
const bcrypt = require("bcrypt")


router.post("/", async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) {
        return res.status(400).json(error.details[0].message)
    }

    const validUser = await User.findOne({ email: req.body.email })

    if (!validUser) {
        return res.status(400).json("Invalid email or password")
    }
    const isValidPassword = await bcrypt.compare(req.body.password, validUser.password)
    if (!isValidPassword) {
        return res.status(400).json("Invalid email or password")
    }

    const token = validUser.generateToken()

    res.json({
        message: "login successful",
        token: token
    })
})

function validateUser(userData) {
    const schema = Joi.object({
        email: Joi.string().min(4).max(255).email().required(),
        password: Joi.string().min(4).max(255).required()
    })

    return schema.validate(userData)
}


module.exports = router