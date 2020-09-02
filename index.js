const express = require('express')
const app = express()

// FORM DATA MIDDLEWARE
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/users', require('./controllers/users'))
app.use('/profiles', require('./controllers/profiles'))

app.get('/', (req, res) => {
    res.send('Yeehaw')
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})

