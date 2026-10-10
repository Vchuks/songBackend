const express = require("express")
const router = express.Router()
const Joi = require("joi")
const SongModel = require("../models/song")
const authMiddleware = require("../middlewares/auth")
const roleMiddleware = require("../middlewares/role")



router.get("/", authMiddleware, async (req, res) => {
    const getQueryCategory = req.query.category
    const getQueryName = req.query.name

    const getSongs = await SongModel.find()
    const getTheSongs = getSongs.filter(item => {
        if (req.query.category || req.query.name) {
            return (item.category) === getQueryCategory || item.name === getQueryName
        }

        return getSongs
    })
    res.json(getTheSongs)
    res.end()
})

router.get("/:id", authMiddleware, async (req, res) => {
    const getId = req.params.id
    const getItem = await SongModel.findById(getId)

    if (!getItem) {
        return res.status(404).send("Song not found")
    }
    res.json(getItem)
    res.end()
})

router.post("/", authMiddleware, async (req, res) => {

    const result = validateData(req.body)

    if (result.error) {
        return res.status(400).send(result.error.details[0].message)
    }

    let newSong = new SongModel({
        name: req.body.name,
        category: req.body.category,
        streams: req.body.streams,
        isArtist: req.body.isArtist
    })

    newSong = await newSong.save()
    res.status(201).json(newSong)
    res.end()
})

router.put("/:id", [authMiddleware, roleMiddleware], async (req, res) => {
    // fetch the song by id
    let getId = await SongModel.findByIdAndUpdate({ _id: req.params.id })
    // ensure the song exists
    console.log(getId)
    if (!getId) {
        return res.status(404).send("Song not found")
    }
    // validate if it exists
    const { error } = validateData(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }


    getId.name = req.body.name,
        getId.category = req.body.category,
        getId.streams = req.body.streams,
        getId.isArtist = req.body.isArtist


const result = await getId.save()
    res.send(result)
    res.end()

})

router.delete("/:id", [authMiddleware, roleMiddleware], async(req, res) => {
    const getSong = await SongModel.findOneAndDelete({_id: req.params.id})

    if (!getSong) {
        return res.status(404).send("Song does not exist")
    }

    res.send(getSong)
})

function validateData(bodyData) {
    const schema = Joi.object({
        name: Joi.string().min(4).max(25).required(),
        category: Joi.string().required(),
        isArtist: Joi.boolean(),
        streams: Joi.number()
    })

    return schema.validate(bodyData)
}

module.exports = router