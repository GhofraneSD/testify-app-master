const mongoose = require('mongoose');


const TopicSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        exams: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam"
        }],
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            }
        ]
    }
);

module.exports = mongoose.model('Topic', TopicSchema);
