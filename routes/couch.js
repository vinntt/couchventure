const router = require("express").Router();
const Couch = require("../models/Couch");
const User = require('../models/User');
const { uploader, cloudinary } = require('../config/cloudinary');


// Get all the couch - search
router.get('/', (req, res, next) => {
    console.log(req)

    Couch.find()
        .then(couches => {
            res.status(200).json(couches)
        })
});

// Create a couch.
router.get("/", (req, res, next) => {
    Couch.find({})
        .then(couch => {
            res.render('couches/:id', { couch })
        })
        .catch(err => next(err))
})

router.post('/', (req, res, next) => {
    const {
        status,
        arrangement,
        numberOfPeople,
        allowChildren,
        allowPets,
        allowSmoking,
        allowWheelchair,
        description,
        distanceCityCenter,
        couchImg
    } = req.body

    const creator = req.user._id

    const newCouch = {
        creator,
        status,
        arrangement,
        numberOfPeople,
        allowChildren,
        allowPets,
        allowSmoking,
        allowWheelchair,
        description,
        distanceCityCenter,
        couchImg
    };

    Couch.create(newCouch)
        .then(couch => {
            res.status(201).json(couch)
        })
        .catch(err => next(err))
        // res.render('couches/')
})

// Get a specific couch.
router.get('/:id', (req, res, next) => {
    Couch.findById(req.params.id)
        .then(couch => {
            // Check for a valid mongoobjectid (mongoose.types.ObjectId.isValid(<id>)).
            if (couch) {
                res.status(200).json(couch)
            } else {
                res.status(404).json({ message: 'Couch not found' })
            }
        })
})

// Update a couch.
router.put('/:id', (req, res, next) => {
    const {
        status,
        arrangement,
        numberOfPeople,
        allowChildren,
        allowPets,
        allowSmoking,
        allowWheelchair,
        description,
        distanceCityCenter,
        couchImg
    } = req.body

    const query = {
        _id: req.params.id,
        creator: req.user._id
    }

    Couch.findOneAndUpdate(query, {
            status,
            city,
            country,
            arrangement,
            numberOfPeople,
            allowChildren,
            allowPets,
            allowSmoking,
            allowWheelchair,
            description,
            distanceCityCenter,
            couchImg
        }, { new: true })
        .then(updatedCouch => {
            if (updatedCouch) {
                res.status(204).json()
            } else {
                res.status(404).json({ message: 'Couch not found' })
            }
        })
        .catch(err => next(err))
})

// Delete a Couch.
router.delete('/:id', (req, res, next) => {
    const query = {
        _id: req.params.id,
        creator: req.user._id
    }

    Couch.findOneAndDelete(query)
        .then((deletedCouch) => {
            if (deletedCouch) {
                res.status(204).json()
            } else {
                res.status(404).json({ message: 'Couch not found' })
            }
        })
        .catch(err => next(err))
});


module.exports = router;