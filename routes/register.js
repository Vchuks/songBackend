const express = require("express")
const router = express.Router()
const { User, validateUser } = require("../models/user")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const jwt= require("jsonwebtoken")



router.post("/", async (req, res) => {
    //validate user input
    const { error } = validateUser(req.body)
    if (error) {
        return res.status(400).json(error.details[0].message)
    }
    // check if email exists
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json("User email already exists")
    }

    //create new user
   
    let newuser = new User( _.pick(req.body, ["name", "email", "password"]))

    const salt = await bcrypt.genSalt()
    newuser.password = await bcrypt.hash(newuser.password, salt)
    
    //save new user to db
    const result = await newuser.save()
     const token = newuser.generateToken()

   
    res.header("x-token", token).status(201).json(_.pick(result, ["name","email", "_id"]))
})

module.exports = router