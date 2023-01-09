const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const examModel = require('../models/exam.model');
const requireAdmin = require('../middleware/require-admin');
const requireOrganizer = require('../middleware/require-organizer');
const ExamController = require('../controllers/exam.controller');
const QuestionController = require('../controllers/question.controller');


const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));


// routes for admins only
router.route('/:examId/question').post(
    asyncHandler(QuestionController.addQuestion));
router.route('/:examId/question/:questionId/answer').get(asyncHandler(
    QuestionController.retrieveQuestionAnswers));
router.route('/:examId/question/:questionId').delete(asyncHandler(
    QuestionController.removeQuestion));

// routes for all types of users
router.route('/:examId/question').get(asyncHandler(
    QuestionController.retrieveQuestionsByExam));
router.route('/:examId/question/:questionId/answer').post(asyncHandler(
    QuestionController.answerQuestion));
router.route('/:examId/question/:questionId/myAnswer').get(asyncHandler(
    QuestionController.retrieveUserAnswerOnQuestion));
