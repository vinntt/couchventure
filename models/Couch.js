const { Schema, model } = require("mongoose");

const couchSchema = new Schema({
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            required: true,
        },
        arrangement: {
            type: String,
            required: true,
        },
        numberOfPeople: {
            type: Number,
            required: true,
        },
        allowChildren: {
            type: Boolean,
        },
        allowPets: {
            type: Boolean,
        },
        allowSmoking: {
            type: Boolean,
        },
        allowWheelchair: {
            type: Boolean,
        },
        description: {
            type: String,
        },
        distanceCityCenter: {
            type: String,
        },
        couchImg: String
    },

    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const Couch = model("Couch", couchSchema);

module.exports = Couch;