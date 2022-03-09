const router = require("express").Router();
const User = require("../models/User");
const CouchRequest = require("../models/CouchRequest");
const Message = require("../models/Message");

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

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
                traveler: creator,
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
                status: 'UNREAD',
            });
        })
        .catch((err) => next(err));
});

module.exports = router;
