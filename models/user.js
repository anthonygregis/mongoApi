const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 15
    },
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 60
    },
    age: Number,
    profile: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    }]
})

module.exports = mongoose.model('User', userSchema)

