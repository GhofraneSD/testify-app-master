const mongoose = require('mongoose');

const OrganizerRequestSchema = mongoose.Schema(
    {
        textRequest: {
            type: String,
            required: true,

        },

        state: {
            type: Number,
            required: true,
            default: 0
        }
        ,
        sendBy:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
        ,
        sendAt: {
            type: Date,
            default: Date.now,
        }
    }
)

module.exports = mongoose.model('OrganizerRequest', OrganizerRequestSchema);
