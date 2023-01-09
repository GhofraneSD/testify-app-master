const httpError = require('http-errors');

const requireOrganizer = function (req, res, next) {
  if (req.user && req.user.roles.indexOf('organizer') > -1) return next();
  else if (req.user && req.user.roles.indexOf('admin') > -1) return next();

  //const err = new httpError(401);
  return res.status(401).json("you need to have the organizer or the admin privilege !!!");
};

module.exports = requireOrganizer;
