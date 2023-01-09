const mongoose = require('mongoose');


const ExamSchema = mongoose.Schema(
    {

        name: {
            type: String,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            required: true,
        },
        thumbnail: {
            type: String
        },
        duration: {
            type: Number,
            required: true,
        },
        expirationAfter: {
            type: Date
        },
        questions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question"
            }
        ],
        passedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        organizer:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        group:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        },
        topics: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Topic"
            }
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        }

    }
)

module.exports = mongoose.model('Exam', ExamSchema);
