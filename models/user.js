const mongoose = require("mongoose")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const config = require("config")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        maxlength: 50,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        minlength: 4,
        maxlength: 255,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 1024,
        trim: true,
    },
    role: {
        type: String
    }
})

userSchema.methods.generateToken = function(){
    return jwt.sign({id: this._id, role: this.role, email: this.email}, config.get("jwtSecretKey"), {expiresIn:"2m"} )
}

const User = mongoose.model("user", userSchema)

function validateUser(userData) {
  const schema =  Joi.object({
        name: Joi.string().min(4).max(50).required(),
        email: Joi.string().min(4).max(255).email().required(),
        password: Joi.string().min(4).max(255).required()
    })

    return schema.validate(userData)
}


module.exports = {User, validateUser}