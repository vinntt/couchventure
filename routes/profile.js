const router = require("express").Router();
const User = require("../models/User");
const Couch = require("../models/Couch");
const Trip = require("../models/Trip");
const { cloudinaryUploader } = require("../middleware/cloudinary");
const CouchRequest = require("../models/CouchRequest");
const Message = require("../models/Message");
const moment = require("moment");

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Get a user profile
router.get("/:id", (req, res, next) => {
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

// Update the user's profile.
router.put("/", cloudinaryUploader.single("profileImg", "couchventure/profiles"), (req, res, next) => {
    const { name, city, country, age, gender, language, visitedCountries, introduction, interestedTopics, profileImg } = req.body;

    console.log(profileImg);

    if (!name) {
        res.status(400).json({ message: "Name is missing" });
        return;
    }

    if (!city) {
        res.status(400).json({ message: "City is missing" });
        return;
    }

    if (!country) {
        res.status(400).json({ message: "Country is missing" });
        return;
    }

    User.findByIdAndUpdate(
        req.user._id,
        {
            name,
            city,
            country,
            age,
            gender,
            language,
            visitedCountries,
            introduction,
            interestedTopics,
            profileImg,
        },
        { new: true }
    )
        .then((updatedProfile) => {
            if (updatedProfile) {
                res.status(204).json();
            } else {
                res.status(404).json({ message: "Profile not found" });
            }
        })
        .catch((err) => next(err));
});

//  Get a couch of specific user.
router.get("/:id/couch", (req, res, next) => {
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

//  Get a trip of specific user.
router.get("/:id/trips", (req, res, next) => {
    if (req.params.id == "me") {
        req.params.id = req.user._id;
    }

    Trip.find({ creator: req.params.id }).sort({startDate: -1, endDate: -1})
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

router.get(`/:id/request`, (req, res, next) => {
    const user = req.user._id;
    const host = req.params.id;

    CouchRequest.findOne({ creator: user, host })
        .then((request) => {
            if (!request) {
                res.status(404).json({ message: "No request" });
                return;
            }

            const { startDate, endDate, numberOfPeople, content } = request;

            res.status(200).json({
                startDate,
                endDate,
                country,
                city,
                numberOfPeople,
                content,
            });
        })
        .catch((err) => next(err));
});

router.post(`/:id/request`, (req, res, next) => {
    const creator = req.user._id;
    const host = req.params.id;

    if (host == "me" || host == creator) {
        res.status(400).json({ message: "Could not request yourself" });
        return;
    }

    const { numberOfPeople, startDate, endDate, content } = req.body;

    if (!dateRegex.test(startDate)) {
        res.status(400).json({ message: "Start Date is invalid" });
        return;
    }

    if (!dateRegex.test(endDate)) {
        res.status(400).json({ message: "End Date is invalid" });
        return;
    }

    if (startDate > endDate) {
        res.status(400).json({ message: "End Date must be after Start Date" });
        return;
    }

    CouchRequest.findOne({ creator, host })
        .then((request) => {
            if (!request) {
                res.status(400).json({ message: "You already requested this host" });
                return;
            }

            return CouchRequest.create({
                creator,
                host,
                numberOfPeople,
                startDate,
                endDate,
                content,
            });
        })
        .then((request) => {
            return Message.create({
                sender: creator,
                recipient: host,
                title: `Requested from ${moment(startDate).format("YYYY-MM-DD")} to ${moment(endDate).format("YYYY-MM-DD")}`,
                content,
            });
        })
        .catch((err) => next(err));
});

module.exports = router;
