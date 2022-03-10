const router = require("express").Router();
const User = require("../models/User");
const Couch = require("../models/Couch");
const Trip = require("../models/Trip");

// Search users by city/country
router.get("/search", (req, res, next) => {
    if (req.params.id == "me") {
        req.params.id = req.user._id;
    }

    Promise.all([User.findById(req.params.id), Couch.findOne({ creator: req.params.id })])
        .then(([user, couch]) => {
            const { name, email, city, country, age, gender, language, visitedCountries, introduction, interestedTopics, profileImg } = user;

            let status = "";

            if (couch) {
                status = couch.status;
            }

            res.status(200).json({
                name,
                email,
                city,
                country,
                age,
                gender,
                language,
                visitedCountries,
                introduction,
                interestedTopics,
                profileImg,
                status,
            });
        })
        .catch((err) => next(err));
});

// Search users by host/couch
router.get("/search", (req, res, next) => {
    if (req.params.id == "me") {
        req.params.id = req.user._id;
    }

    Couch.findOne({ creator: req.params.id })
        .then((couch) => {
            if (couch) {
                const { _id, status, arrangement, numberOfPeople, allowChildren, allowPets, allowSmoking, allowWheelchair, description, publicTransportation, distanceCityCenter, couchImg } = couch;

                res.status(200).json({
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
                    couchImg,
                });
            } else {
                res.status(404).json({ message: "Couch not found" });
            }
        })
        .catch((err) => next(err));
});

// Search users by traveller/trip
router.get("/search", (req, res, next) => {
    if (req.params.id == "me") {
        req.params.id = req.user._id;
    }

    Trip.find({ creator: req.params.id })
        .sort({ startDate: -1, endDate: -1 })
        .then((trips) => {
            const result = [];

            if (Array.isArray(trips)) {
                result.push(
                    ...trips.map((trip) => {
                        const { _id, startDate, endDate, country, city, numberOfPeople, content } = trip;

                        return {
                            id: _id,
                            startDate,
                            endDate,
                            country,
                            city,
                            numberOfPeople,
                            content,
                        };
                    })
                );
            }

            res.status(200).json(result);
        })
        .catch((err) => next(err));
});

module.exports = router;
