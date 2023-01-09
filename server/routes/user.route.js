const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');
const userModel = require('../models/user.model');
const requireAdmin = require('../middleware/require-admin');
const { upload } = require('../services/fileUpload.service');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

router.route('/').post(asyncHandler(insert));
router.route('/').get(asyncHandler(getAll));
router.route('/:userId/role').post(asyncHandler(userCtrl.addRole));
router.route('/requestOrganizer').post(
  asyncHandler(userCtrl.sendOrganizerRequest));
router.route('/requestOrganizer').get(
  asyncHandler(userCtrl.retrieveAllOrganizerRequest));
router.route('/requestOrganizer/:requestId/accept').patch(
  asyncHandler(requireAdmin, userCtrl.acceptRequest));
router.route('/requestOrganizer/:requestId/reject').patch(
  asyncHandler(userCtrl.rejectRequest));

router.put('/:userId/sendAvatar', upload.single('avatar'),
  sendAvatar);


async function insert(req, res) {
  let user = await userCtrl.insert(req.body);
  res.json(user);
}

async function getAll(req, res) {
  let users = await userCtrl.retrieveAll();
  res.json(users);
}

async function sendAvatar(req, res, next) {
  const url = req.protocol + '://' + req.get('host')
  let user = await userModel.findByIdAndUpdate(req.params.userId, {
    avatar: url + '/public/' + req.file.filename,
  });

  res.send(user);
}