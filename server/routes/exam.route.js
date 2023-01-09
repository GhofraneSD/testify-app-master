const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const requireAdmin = require('../middleware/require-admin');
const ExamController = require('../controllers/exam.controller');
const { upload } = require('../services/fileUpload.service');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

// routes for admins only
router.route('/').post(asyncHandler(ExamController.create));
router.route('/organizedBy/:organizerId').get(asyncHandler(ExamController.retrieveByOrganizer));

router.route('/:examId/thumbnail').post(upload.single('thumbnail'), asyncHandler(ExamController.changeThumbnail));

router.route('/:examId').delete(asyncHandler(ExamController.deleteExam));
router.route('/:examId/users').get(
    asyncHandler(ExamController.retrieveUsersFromExam));

// routes for all types of users
router.route('/').get(asyncHandler(ExamController.retrieveAll));
router.route('/:examId').get(asyncHandler(ExamController.retrieveOne));
router.route('/:examId/pass').patch(asyncHandler(ExamController.passExam));