const { Schema, model } = require("mongoose");

const messageSchema = new Schema({
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        recipient: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        messageContent: {
            type: String,
            required: true,
        },
    },

    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const Message = model("Message", messageSchema);

module.exports = Message;