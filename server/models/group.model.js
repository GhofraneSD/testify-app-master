const mongoose = require('mongoose');


const GroupSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        name: {
            type: String,
        },
        exams: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam"
        }],
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        moderator:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",

        }
    }
);

module.exports = mongoose.model('Group', GroupSchema);
