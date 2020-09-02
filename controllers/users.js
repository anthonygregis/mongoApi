const router = require('express').Router()
const db = require('../models')

router.get('/', (req, res) => {
    db.User.find().populate('profile')
        .then(users => {
            console.log(users)
            res.send(users)
        })
        .catch(err => {
            console.log("Error:", err)
            res.status(503).send({message: 'ResidentSleeper'})
        })
})

router.get('/:id', (req, res) => {
    db.User.findById(req.params.id).populate('profile')
        .then(user => {
            if (user) {
                console.log(user)
                res.send(user)
            } else {
                res.status(404).send({message: "Resource not located"})
            }
        })
        .catch(err => {
            console.log("Error:", err)
            res.status(503).send({message: 'ResidentSleeper'})
        })
})

router.post('/', (req, res) => {
    db.User.create(req.body)
        .then(createdUser => {
            console.log(createdUser)
            res.status(201).send(createdUser)
        })
        .catch(err => {
            console.log("Error while creating user:", err)
            if(err.errors.name) {
                res.status(406).send({message: 'Beep Boop, missing a field.'})
            } else {
                console.log("Error:", err)
                res.status(503).send({message: 'ResidentSleeper'})
            }
        })
})

router.put('/:id', (req, res) => {
    db.User.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        req.body,
        {
            new: true,
        }
    )
        .then(updatedUser => {
            res.send(updatedUser)
        })
        .catch((error) => {
            console.error(error)
            res.status(503).send({ message: "Server Error" })
        })
})

router.put('/:id/profile', (req, res) => {
    db.User.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        req.body,
        {
            new: true,
        }
    )
        .then(updatedUser => {
            res.send(updatedUser)
        })
        .catch((error) => {
            console.error(error)
            res.status(503).send({ message: "Server Error" })
        })
})

router.delete('/', (req, res) => {
    db.User.deleteMany()
        .then(() => {
            res.status(204).send({message: 'Deleted all records'})
        })
        .catch(err => {
            console.log(err)
            res.status(503).send({message: 'Server Error'})
        })
})

router.delete('/:id', (req, res) => {
    db.User.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).send({message: 'Deleted record'})
        })
        .catch(err => {
            console.log("Error:", err)
        })
})

module.exports = router