const Trip = require("../models/Trip");
const router = require("express").Router();
const User = require('../models/User')

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Get all the trips - search
router.get('/', (req, res, next) => {
    console.log(req)

    Trip.find()
        .then(trips => {
            res.status(200).json(trips)
        })
});

router.get("/", (req, res, next) => {
    User.find({})
    .then(user => {
        res.render('trips/:id', { user })
    })
    .catch(err => next(err))
})

// Create a trip.
router.post('/', (req, res, next) => {
    const { startDate, endDate, country, city, numberOfPeople, content } = req.body
    const creator = req.user._id

    if (!dateRegex.test(startDate)) {
        res.status(400).json({ message: 'Start Date is invalid' });
        return;
    }

    if (!dateRegex.test(endDate)) {
        res.status(400).json({ message: 'End Date is invalid' });
        return;
    }

    if (startDate > endDate) {
        res.status(400).json({ message: 'End Date must be after Start Date' });
        return;
    }

    const newTrip = {
        creator,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        country,
        city,
        numberOfPeople,
        content
    };

    Trip.create(newTrip)
        .then(trip => {
            res.status(201).json(trip)
        })
        .catch(err => next(err))
})

// Get a specific trip.
router.get('/:id', (req, res, next) => {
    Trip.findById(req.params.id)
        .then(trip => {
            // Check for a valid mongoobjectid (mongoose.types.ObjectId.isValid(<id>)).
            if (trip) {
                res.status(200).json(trip)
            } else {
                res.status(404).json({ message: 'Trip not found' })
            }
        })
})

// Update a trip.
router.put('/:id', (req, res, next) => {
    const { startDate, endDate, country, city, numberOfPeople, content } = req.body
    const query = {
        _id: req.params.id,
        creator: req.user._id
    }

    Trip.findOneAndUpdate(query, { startDate, endDate, country, city, numberOfPeople, content }, { new: true })
        .then(updatedTrip => {
            if (updatedTrip) {
                res.status(204).json()
            } else {
                res.status(404).json({ message: 'Trip not found' })
            }
        })
        .catch(err => next(err))
})

// Delete a trip.
router.delete('/:id', (req, res, next) => {
    const query = {
        _id: req.params.id,
        creator: req.user._id
    }

    Trip.findOneAndDelete(query)
        .then((deletedTrip) => {
            if (deletedTrip) {
                res.status(204).json()
            } else {
                res.status(404).json({ message: 'Trip not found' })
            }
        })
        .catch(err => next(err))
});


module.exports = router;
