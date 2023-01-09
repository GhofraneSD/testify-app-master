const bcrypt = require('bcrypt');
const Joi = require('joi');
const examModel = require('../models/exam.model');
const Exam = require('../models/exam.model');
const questionModel = require('../models/question.model');
const topicModel = require('../models/topic.model');

const TopicSchema = Joi.object({
  name: Joi.string().required(),
});

const ExamController = {

  // retrieve all exams records from database
  retrieveAll: async (req, res) => {
    const topics = await topicModel.find({});

    try {
      res.send(topics);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // retrieve single topic record by ID from db
  retrieveTopicById: async (req, res) => {

    const exam = await exam.findById(req.params.topicId).populate('exams').catch((err) => {
      res.status(404).send(err)
    });

    try {
      res.send(topic);
    } catch (error) {
      res.status(500).send(error);
    }
  },


  // retrieve single topic record by ID from db
  retrieveTopicByName: async (req, res) => {

    const exam = await exam.find({ name: req.params.topicName }).populate('exams').catch((err) => {
      res.status(404).send(err)
    });

    try {
      res.send(topic);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // create single exam record
  create: async (req, res) => {
    let topic = await TopicSchema.validateAsync(req.body, { abortEarly: false });
    let newTopic = await new Exam(topic);
    newTopic = await newTopic.save();
    res.send(newTopic);
  },


  // retrieve all users associated(passed) specified exam
  retrieveTopicFollowers: async (req, res) => {

    const topic = await topicModel.findById(req.params.topicId).populate("followers", "-roles");

    try {
      res.send(topic.followers);
    } catch (error) {
      res.status(500).send(error);
    }
  },


  // following topic features (establishing topic-user relashionship)
  followTopic: async (req, res) => {

    user = await userModel.findByIdAndUpdate(
      req.user._id,
      { $push: { topicsFollowed: req.params.topicId } },
      { new: true, useFindAndModify: false }
    );

    topic = await topicModel.findByIdAndUpdate(
      req.params.topicId,
      { $push: { followers: req.user._id } },
      { new: true, useFindAndModify: false }
    );

    return res.send("topic followed");
  },


  // following topic features (establishing topic-user relashionship)
  unfollowTopic: async (req, res) => {

    user = await userModel.findByIdAndUpdate(
      req.user._id,
      { $pull: { topicsFollowed: req.params.topicId } },
    );

    topic = await topicModel.findByIdAndUpdate(
      req.user._id,
      { $pull: { followers: reqreq.params.topicId } },
    );

    return res.send("topic followed");
  }
}

module.exports = ExamController;
