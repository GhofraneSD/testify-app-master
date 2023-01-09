const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const requireAdmin = require('../middleware/require-admin');
const TopicController = require('../controllers/topic.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

// routes for admins only
router.route('/').post(asyncHandler(TopicController.create));

router.route('/:topicId/follower').get(
    asyncHandler(TopicController.retrieveTopicFollowers));

// routes for all types of users
router.route('/').get(asyncHandler(TopicController.retrieveAll));
router.route('/:topicId').get(asyncHandler(TopicController.retrieveTopicById));
router.route('/:topicName').get(asyncHandler(TopicController.retrieveTopicByName));

router.route('/:topicId/follow').patch(asyncHandler(TopicController.followTopic));
router.route('/:topicId/unfollow').patch(asyncHandler(TopicController.unfollowTopic));