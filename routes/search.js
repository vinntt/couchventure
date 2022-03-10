const router = require("express").Router();
const User = require("../models/User");
const Couch = require("../models/Couch");
const Trip = require("../models/Trip");
const { cloudinaryUploader } = require("../middleware/cloudinary");

// Search users by city/country
router.get("/", (req, res, next) => {
    const {city, country, type} = req.query;
    const query = {};

    if (city) {
        query.city = city;
    }

    if (country) {
        query.country = country;
    }

    User.find(query)
        .then(users => {
            res.status(200).json(users.map(user => {
                const { name, email, city, country, age, gender, language, visitedCountries, introduction, interestedTopics, profileImg } = user;

                return {
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
                };
            }));
        })
        .catch(err => next(err))
});

// Search users by host/couch
// router.get("/search", (req, res, next) => {

//     User.find({ location: { city: req.query.city, country: req.query.country } })
//         .populate('status')
//         .then(user => {
//             const { profileImg, name, city, country, language, status, description } = user
//             res.render("profile/search", { user, location })
//         })
//         .catch(err => next(err))
// });

// Search users by traveller/trip
// router.get("/search", (req, res, next) => {
//     if (req.params.id == "me") {
//         req.params.id = req.user._id;
//     }

//     Trip.find({ creator: req.params.id }).sort({ startDate: -1, endDate: -1 })
//         .then((trips) => {
//             const result = [];

//             if (Array.isArray(trips)) {
//                 result.push(
//                     ...trips.map((trip) => {
//                         const { _id, startDate, endDate, country, city, numberOfPeople, content } = trip;

//                         return {
//                             id: _id,
//                             startDate,
//                             endDate,
//                             country,
//                             city,
//                             numberOfPeople,
//                             content,
//                         };
//                     })
//                 );
//             }

//             res.status(200).json(result);
//         })
//         .catch((err) => next(err));
// });

module.exports = router;
