const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
    {
        sender: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        recipient: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
        },
        content: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ["READ", "UNREAD", "ARCHIVED", "DELETED"],
        },
    },

    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const Message = model("Message", messageSchema);

module.exports = Message;
