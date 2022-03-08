const router = require("express").Router();
const { cloudinaryUploader } = require("../middleware/cloudinary");
const Couch = require("../models/Couch");

// Get all the couch - search
router.get('/', (req, res, next) => {
    console.log(req)

    Couch.find()
        .then(couches => {
            res.status(200).json(couches)
        });
});

router.get("/", (req, res, next) => {
    Couch.find({})
        .then(couch => {
            res.render('couches/:id', { couch })
        })
        .catch(err => next(err));
})

// Create or udpate a couch.
router.post('/', cloudinaryUploader.multiple("couchImg", (req) => `couchventure/couches/${req.user._id}`), (req, res, next) => {
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
    } = req.body;

    const creator = req.user._id;

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
            const {
                _id,
                status,
                arrangement,
                numberOfPeople,
                allowChildren,
                allowPets,
                allowSmoking,
                allowWheelchair,
                description,
                publicTransportation,
                distanceCityCenter,
                couchImg
            } = couch

            res.status(201).json({
                id: _id,
                status,
                arrangement,
                numberOfPeople,
                allowChildren,
                allowPets,
                allowSmoking,
                allowWheelchair,
                description,
                publicTransportation,
                distanceCityCenter,
                couchImg
            })
        })
        .catch(err => next(err));
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
        });
})

// Update a couch.
router.put('/:id', cloudinaryUploader.multiple("couchImg", (req) => `couchventure/couches/${req.user._id}`), (req, res, next) => {
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
    };

    Couch.findOneAndUpdate(query, {
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
        }, { new: true })
        .then(updatedCouch => {
            if (updatedCouch) {
                res.status(204).json()
            } else {
                res.status(404).json({ message: 'Couch not found' })
            }
        })
        .catch(err => next(err));
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