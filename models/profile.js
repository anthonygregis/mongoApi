const mongoose = require('mongoose')

let profileSchema = new mongoose.Schema({
    bio: {
        type: String,
        minlength: 1,
        maxlength: 125
    },
    profilePic: String,
    colorTheme: String
})

module.exports = mongoose.model('Profile', profileSchema)