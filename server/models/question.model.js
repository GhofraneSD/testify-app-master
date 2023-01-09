const mongoose = require('mongoose');


const QuestionSchema = mongoose.Schema(
    {
        text: {
            type: String,
            required: true
        },
        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam"
        },
        answers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Answer"
            }
        ],
        choices: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Choice",
            }
        ]
    }
);

module.exports = mongoose.model('Question', QuestionSchema);
