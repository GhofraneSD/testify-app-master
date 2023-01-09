const httpError = require('http-errors');
const userModel = require('../models/user.model');

const requireGroupMember = function (req, res, next) {

  let group = userModel.findById(req.params.examId).group;
  if (req.user && req.user.groups.indexOf(group._id) > -1) return next();
  const err = new httpError(401);
  return next(err);
};

module.exports = requireGroupMember;
