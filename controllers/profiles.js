const router = require('express').Router()
const db = require('../models')

router.get('/', (req, res) => {
    db.Profile.find()
        .then(profiles => {
            console.log(profiles)
            res.send(profiles)
        })
        .catch(err => {
            console.log("Error:", err)
            res.status(503).send({message: 'ResidentSleeper'})
        })
})

router.get('/:id', (req, res) => {
    db.Profile.findById(req.params.id)
        .then(profile => {
            if (profile) {
                console.log(profile)
                res.send(profile)
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
    db.Profile.create(req.body)
        .then(createdProfile => {
            console.log(createdProfile)
            res.status(201).send(createdProfile)
        })
        .catch(err => {
            console.log("Error while creating profile:", err)
            if(err.errors.name) {
                res.status(406).send({message: 'Beep Boop, missing a field.'})
            } else {
                console.log("Error:", err)
                res.status(503).send({message: 'ResidentSleeper'})
            }
        })
})

router.put('/:id', (req, res) => {
    db.Profile.findOneAndUpdate(
        {
            _id: req.params.id,
        },
        req.body,
        {
            new: true,
        }
    )
        .then(updatedProfile => {
            res.send(updatedProfile)
        })
        .catch((error) => {
            console.error(error)
            res.status(503).send({ message: "Server Error" })
        })
})

router.delete('/:id', (req, res) => {
    db.Profile.findByIdAndDelete(req.params.id)
        .then(() => {
            res.status(204).send({message: 'Deleted record'})
        })
        .catch(err => {
            console.log("Error:", err)
        })
})

module.exports = router