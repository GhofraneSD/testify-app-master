const mongoose = require('mongoose');


const AnswerSchema = mongoose.Schema(
    {
        textAnswer: {
            type: String
        },
        chosenChoices: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Choice"
        }],
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        },
        answeredBy:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        isCorrect: {
            type: Boolean
        }

    }
);

module.exports = mongoose.model('Answer', AnswerSchema);
