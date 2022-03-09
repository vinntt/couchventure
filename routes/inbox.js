const router = require("express").Router();
const User = require("../models/User");
const CouchRequest = require("../models/CouchRequest");
const Message = require("../models/Message");
const moment = require("moment");

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Get the messages with the user.
router.get(`/:id`, (req, res, next) => {
    const sender = req.user._id;
    const recipient = req.params.id;

    Message.find({
        $or: [
            { sender, recipient },
            { sender: recipient, recipient: sender },
        ],
        status: { $in: ["READ", "UNREAD"] },
    })
        .sort({ createdAt: -1 })
        .populate("sender", "_id name profileImg")
        .populate("recipient", "_id name profileImg")
        .then((messages) => {
            if (!Array.isArray(messages)) {
                console.log(messages);
                res.status(500).json({ message: "Unexpected data" });
                return;
            }

            res.status(200).json(
                messages.map((message) => {
                    const {
                        sender: { _id: senderId, name: senderName, profileImg: senderProfileImg },
                        recipient: { _id: recipientId, name: recipientName, profileImg: recipientProfileImg },
                        title,
                        content,
                        createdAt,
                    } = message;

                    return {
                        sender: {
                            id: senderId,
                            name: senderName,
                            profileImg: senderProfileImg,
                        },
                        recipient: {
                            id: recipientId,
                            name: recipientName,
                            profileImg: recipientProfileImg,
                        },
                        title,
                        content,
                        createdAt,
                    };
                })
            );
        })
        .catch((err) => next(err));
});

router.post(`/:id`, (req, res, next) => {
    const sender = req.user._id;
    const recipient = req.params.id;
    const { content } = req.body;

    if (!content || content.trim() === "") {
        res.status(400).json({ message: "Missing message content" });
    }

    const message = {
        sender,
        recipient,
        content: content.trim(),
        status: "UNREAD",
    };

    Message.create(message)
        .then(() => res.status(204).json())
        .catch((err) => next(err));
});

router.get(`/:id/request`, (req, res, next) => {
    const user = req.user._id;
    const host = req.params.id;

    console.log();

    CouchRequest.findOne({
        $or: [
            { creator: user, host },
            { host: user, creator: host },
        ],
    })
        .then((request) => {
            if (!request) {
                res.status(404).json({ message: "No request" });
                return;
            }

            const { creator, traveler, host, startDate, endDate, numberOfPeople, content } = request;

            res.status(200).json({
                creator,
                traveler,
                host,
                startDate,
                endDate,
                numberOfPeople,
                content,
            });
        })
        .catch((err) => next(err));
});

router.delete(`/:id/request`, (req, res, next) => {
    const user = req.user._id;
    const host = req.params.id;

    if (host == "me" || host == user) {
        res.status(400).json({ message: "Could not cancel yourself" });
        return;
    }

    const { reason } = req.body;

    CouchRequest.findOneAndDelete({
        $or: [
            { creator: user, host },
            { host: user, creator: host },
        ],
    })
        .then((request) => {
            if (!request) {
                res.status(404).json({ message: "No request to delete" });
                return;
            }

            if (reason === "REQUEST_DECLINE") {
                return Message.create({
                    sender: user,
                    recipient: host,
                    title: `Request Declined`,
                    content: `The request has been declined`,
                    status: "UNREAD",
                });
            }

            return Message.create({
                sender: user,
                recipient: host,
                title: `Request Canceled`,
                content: `The trip has been canceled`,
                status: "UNREAD",
            });
        })
        .then(() => res.status(204).json())
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
            if (request) {
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
                status: "UNREAD",
            });
        })
        .then(() => res.status(204).json())
        .catch((err) => next(err));
});

module.exports = router;
