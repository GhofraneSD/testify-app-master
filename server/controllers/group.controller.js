const bcrypt = require('bcrypt');
const Joi = require('joi');
const examModel = require('../models/exam.model');
const Exam = require('../models/exam.model');
const questionModel = require('../models/question.model');
const groupModel = require('../models/group.model');
const userModel = require('../models/user.model');

const GroupSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string()
});

const GroupController = {

  // retrieve all groups records from database
  retrieveAll: async (req, res) => {
    const groups = await groupModel.find({});

    try {
      res.send(groups);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // retrieve all groups records by organizer from database
  retrieveByModerator: async (req, res) => {
    const groups = await groupModel.find({ moderator: req.params.moderatorId });

    try {
      res.send(groups);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  // retrieve all groups records by member from database
  retrieveByMember: async (req, res) => {
    const user = await userModel.findById(req.params.memberId).populate('groups');

    try {
      res.send(user.groups);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // retrieve single exam record by ID from db
  retrieveOne: async (req, res) => {

    await groupModel.findById(req.params.groupId)
      .populate('moderator').populate('exams').populate('members')
      .then((group) => {
        res.send(group);
      }).catch((err) => {
        res.status(404).send(err)
      });
  },


  // retrieve single exam record by ID from db
  retrieveOne: async (req, res) => {

    await groupModel.findById(req.params.groupId)
      .populate('moderator', "fullname").populate('exams')
      .then((group) => {
        res.send(group);
      }).catch((err) => {
        res.status(404).send(err)
      });
  },


  // create single group
  create: async (req, res) => {
    let group = await GroupSchema.validateAsync(req.body,
      { abortEarly: false });
    let newGroup = await new groupModel(group);
    newGroup.moderator = req.user;
    newGroup = await newGroup.save();
    res.send(newGroup);
  },


  deleteGroup: async (req, res) => {

    // remove relationship between user(student) and group
    await userModel.updateMany({ groups: req.params.groupId },
      { $pull: { groups: req.params.groupId } });

    // delete all group's exams
    await examModel.deleteMany({ group: req.params.groupId });

    // delete group record
    await groupModel.findByIdAndDelete(req.params.groupId);

    res.status(202).send("group deleted");
  },


  // retrieve all users associated with specified group
  retrieveUsersFromGroup: async (req, res) => {

    const group = await examModel.findById(req.params.examId)
      .populate("members", "-roles");

    try {
      res.send(group.members);
    } catch (error) {
      res.status(500).send(error);
    }
  },


  //associate user with specified group
  addUserToGroup: async (req, res) => {

    let group = await groupModel.findByIdAndUpdate(
      req.params.groupId,
      { $push: { members: req.params.groupId } },
      { new: true, useFindAndModify: false }
    );

    user = await userModel.findByIdAndUpdate(
      req.params.userId,
      { $push: { groups: group._id } },
      { new: true, useFindAndModify: false }
    );
    return res.send("membership saved");
  },


  //associate user with specified group
  removeUserFromGroup: async (req, res) => {

    let group = await group.findByIdAndUpdate(
      req.params.groupId,
      { $pull: { members: req.params.userId } },
    );

    user = await userModel.findByIdAndUpdate(
      req.params.userId,
      { $pull: { groups: req.params.groupId } }
    );
    return res.send("membership removed");
  }

}
module.exports = GroupController;
