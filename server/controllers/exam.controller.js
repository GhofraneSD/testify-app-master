const bcrypt = require('bcrypt');
const Joi = require('joi');
const examModel = require('../models/exam.model');
const Exam = require('../models/exam.model');
const questionModel = require('../models/question.model');
const userModel = require('../models/user.model');

const ExamSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  expirationAfter: Joi.date(),
  group: Joi.string(),
  topics: Joi.any(),
  duration: Joi.number().required(),
});

const ExamController = {

  // retrieve all exams records from database
  retrieveAll: async (req, res) => {
    const exams = await examModel.find({}).populate('questions').populate('organizer');

    try {
      res.send(exams);
    } catch (error) {
      res.status(500).send(error);
    }
  },


  // retrieve all exams records from database
  retrieveByOrganizer: async (req, res) => {
    const exams = await examModel.find({ organizer: req.params.organizerId }).populate('organizer', '-roles');

    try {
      res.send(exams);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // retrieve single exam record by ID from db
  retrieveOne: async (req, res) => {

    const exam = await examModel.findById(req.params.examId).populate('organizer').catch((err) => {
      res.status(404).send(err)
    });

    try {
      res.send(exam);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // create single exam record
  create: async (req, res) => {
    let exam = await ExamSchema.validateAsync(req.body, { abortEarly: false });
    let newExam = await new Exam(exam);
    newExam.organizer = req.user;
    newExam = await newExam.save();
    res.send(newExam);
  },


  changeThumbnail: async (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    let user = await examModel.findByIdAndUpdate(req.params.examId, {
      thumbnail: url + '/public/' + req.file.filename,
    });
  },

  deleteExam: async (req, res) => {

    // remove relationship between user(student) and exam
    await userModel.findByIdAndUpdate(
      req.user._id,
      { $pull: { passedExams: req.params.examId } },
    );

    // delete all exam's questions
    await questionModel.deleteMany({ exam: req.params.examId });

    // delete exam record
    await examModel.findByIdAndDelete(req.params.examId);

    res.status(202).send("exam deleted");
  },

  // retrieve all users associated(passed) specified exam
  retrieveUsersFromExam: async (req, res) => {

    const exam = await examModel.findById(req.params.examId).populate("passedBy", "-roles");

    try {
      res.send(exam.passedBy);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // passing exam features (establishing exam-user relashionship)
  passExam: async (req, res) => {

    let exam = await examModel.findByIdAndUpdate(
      req.params.examId,
      { $push: { passedBy: req.user._id } },
      { new: true, useFindAndModify: false }
    );

    user = await userModel.findByIdAndUpdate(
      req.user._id,
      { $push: { passedExams: exam._id } },
      { new: true, useFindAndModify: false }
    );
    return res.send(exam);
  }
}

module.exports = ExamController;
