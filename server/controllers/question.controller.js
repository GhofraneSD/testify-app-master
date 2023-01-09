const Joi = require('joi');
const answerModel = require('../models/answer.model');
const choiceModel = require('../models/choice.model');
const examModel = require('../models/exam.model');
const Exam = require('../models/exam.model');
const questionModel = require('../models/question.model');
const userModel = require('../models/user.model');

const ChoiceSchema = Joi.object({
  choiceLabel: Joi.string().required(),
  isTrue: Joi.boolean().required()
});

const QuestionSchema = Joi.object({
  text: Joi.string().required(),
  choices: Joi.any()
});

const AnswerSchema = Joi.object({
  textAnswer: Joi.string(),
  chosenChoices: Joi.any()
});


const QuestionController = {

  retrieveQuestionsByExam: async (req, res) => {

    const questions = await questionModel.where('exam')
      .equals(req.params.examId).populate('choices').exec();

    try {
      res.send(questions);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // creating question record and their choices
  addQuestion: async (req, res) => {

    // saving question + establishing exam-question relationship
    let question = await QuestionSchema.validateAsync(req.body, { abortEarly: false });
    question.exam = req.params.examId;
    let choices = question.choices;
    delete question.choices;
    newQuestion = await new questionModel(question).save();
    const exam = await examModel.findById(req.params.examId);
    exam.questions.push(newQuestion);
    await exam.save();

    // saving list of choices + establishing exam-choices relationship
    choices.forEach(async (e) => {
      let choice = await ChoiceSchema.validateAsync(e, { abortEarly: false });
      choice.question = newQuestion;
      newChoice = await new choiceModel(choice).save();
      await questionModel.updateOne({ _id: newQuestion._id },
        { $push: { choices: newChoice } }
      );
    });
    newQuestion = await newQuestion.save();
    return res.json(newQuestion);
  },


  //----------------to complete
  //------------saving answer
  answerQuestion: async (req, res) => {

    let answer = await AnswerSchema.validateAsync(req.body, { abortEarly: false });
    let newAnswer = new answerModel(answer);
    newAnswer.answeredBy = req.user;
    newAnswer.question = req.params.questionId;
/*
    let choices = await choiceModel.find({ isTrue: true, question: req.params.questionId }).exec();
    let choicesIds = [];
    choices.forEach(element => {
      choicesIds.push(element._id);
    });

    newAnswer.isCorrect = isEqual(newAnswer.chosenChoices, choicesIds);
*/
    newAnswer = await newAnswer.save();

    let question = await questionModel.findByIdAndUpdate(
      req.params.questionId,
      { $push: { answers: newAnswer._id } },
      { new: true, useFindAndModify: false }
    );


    let user = await userModel.findByIdAndUpdate(
      req.user._id,
      { $push: { answers: newAnswer._id } },
      { new: true, useFindAndModify: false }
    );
    return res.send(newAnswer);
  },

  retrieveUserAnswerOnQuestion: async (req, res) => {
    const answer = await answerModel.findOne({
      "question": req.params.questionId,
      "answeredBy": req.user._id
    }).populate("chosenChoices");
    try {
      res.send(answer);
    } catch (error) {
      res.status(500).send(error);
    }

  },

  retrieveQuestionAnswers: async (req, res) => {

    const question = await questionModel.findById(req.params.questionId);

    try {
      res.send(question.answers);
    } catch (error) {
      res.status(500).send(error);
    }

  },

  // removing the question's record and its relashionships with exam-choice-answer
  removeQuestion: async (req, res) => {

    await choiceModel.deleteMany({ question: req.params.questionId });

    await examModel.findByIdAndUpdate(
      req.params.examId,
      { $pull: { questions: req.params.questionId } },
    );
    await answerModel.deleteMany({ question: req.params.questionId });
    await choiceModel.deleteMany({ question: req.params.questionId });
    await questionModel.findByIdAndDelete(req.params.questionId);

    res.status(202).send();
  }

}


function isEqual(a1 = [], a2 = []) {
  if (a1.length != a2.length) {
    return false;
  }
  else {
    a1.forEach(
      e => {
        if (a2.indexOf(e)=-1) return false
      }
    )
  }

  return true;
}

module.exports = QuestionController;
