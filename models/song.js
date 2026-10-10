
const mongoose = require("mongoose")

const songSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ["worship", "praise", "pop", "blues"]
    },
    streams: {
        type: Number
    },
    isArtist: { type: Boolean },
    isReleased: {
        type: Date,
        default: Date.now
    }
    // artistInfo: {
    //     type: Array,
    //     validate: {
    //         validator: function(value){
    //             console.log(this.isArtist)
    //             return  value && value.length > 0
    //         },
    //         message: "There should be at least one artist"
    //     }
    // }
})

const SongModel = mongoose.model("Music", songSchema)



module.exports = SongModel