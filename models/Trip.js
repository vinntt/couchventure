const { Schema, model } = require("mongoose");

const tripSchema = new Schema({
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
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
    },

    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const Trip = model("Trip", tripSchema);

module.exports = Trip;