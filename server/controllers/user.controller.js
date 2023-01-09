const bcrypt = require('bcrypt');
const Joi = require('joi');
const User = require('../models/user.model');
const examModel = require("../models/exam.model");
const organizerRequestModel = require('../models/organizerRequest.model');
const { CONSOLE_APPENDER } = require('karma/lib/constants');

const userSchema = Joi.object({
  fullname: Joi.string().required(),
  email: Joi.string().email(),
  mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/),
  password: Joi.string().required(),
  repeatPassword: Joi.string().required().valid(Joi.ref('password')),
});

const requestSchema = Joi.object({
  textRequest: Joi.string().required(),

});

module.exports = {
  insert,
  retrieveAll,
  addRole,
  sendOrganizerRequest,
  acceptRequest,
  rejectRequest,
  retrieveAllOrganizerRequest
};

async function insert(user) {
  user = await userSchema.validateAsync(user, { abortEarly: false });
  user.hashedPassword = bcrypt.hashSync(user.password, 10);
  delete user.password;
  return await new User(user).save();
}

async function completeProfile() {

}

async function sendOrganizerRequest(req, res) {
  let request = await requestSchema.validateAsync(req.body, { abortEarly: false });
  let newRequest = await new organizerRequestModel(request);
  newRequest.sendBy = req.user;
  newRequest = await newRequest.save();
  res.send(newRequest);
}

async function addRole() {
  let user = await userModel.findByIdAndUpdate(
    req.params.userId,
    { $push: { roles: req.body.role } },
    { new: true, useFindAndModify: false }
  );
  return user;
}

async function acceptRequest(req, res) {
  let request = await organizerRequestModel.findByIdAndUpdate(
    req.params.requestId,
    { state: 1 }, function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs);
      }
    }
  );
  let user = await userModel.findByIdAndUpdate(
    req.params.userId,
    { $push: { roles: "organizer" } },
    { new: true, useFindAndModify: false }
  );
  return res.send("request accepted");
}

async function rejectRequest(req, res) {
  let request = await organizerRequestModel.findByIdAndUpdate(
    req.params.requestId,
    { state: -1 },
    function (err, docs) {
      if (err) {
        res.send(err);
      } else {
        res.send("request rejected");
      }
    }
  );
}

async function retrieveAll() {
  const users = await User.find({});
  return users;
}



async function retrieveAllOrganizerRequest(req, res) {
  const requestsOrganizer = await organizerRequestModel.find({}).populate("sendBy", "-roles");
  res.send(requestsOrganizer);
}
