const { Schema, model } = require("mongoose");

const userSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'diverse'],
        },
        language: [{
            type: String,
        }],
        visitedCountries: [{
            type: String,
        }],
        introduction: {
            type: String,
        },
        interestedTopics: [{
            type: String,
        }],
        profileImg: String
    },

    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const User = model("User", userSchema);

module.exports = User;