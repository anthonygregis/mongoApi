const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/bountyhunters', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})

const db = mongoose.connection

db.once('open', () => {
    console.log(`MongoDB is connected at ${db.host}:${db.port}`)
})
db.on('error', console.error.bind(console, 'connection error:'));

module.exports.Profile = require('./profile')
module.exports.User = require('./user')
