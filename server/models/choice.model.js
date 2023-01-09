const mongoose = require('mongoose');


const ChoiceSchema = mongoose.Schema(
    {
        choiceLabel: {
            type: String,
            required: true,
        },
        isTrue: {
            type: Boolean,
            required: true,
        },
        question: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        },
        answers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Answer"
            }
        ]
    }
);

module.exports = mongoose.model('Choice', ChoiceSchema);
