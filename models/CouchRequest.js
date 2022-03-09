const { Schema, model } = require("mongoose");

const couchRequestSchema = new Schema(
    {
        creator: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        traveler: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        host: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        numberOfPeople: {
            type: Number,
            required: true,
        },
        startDate: {
            type: Date,
            // min: '1987-09-28',
            // max: '1994-05-23'
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["PENDING", "ACCEPTED", "DECLINED", "CANCELED"],
        },
    },

    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const CouchRequest = model("CouchRequest", couchRequestSchema);

module.exports = CouchRequest;
