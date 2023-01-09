const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const requireAdmin = require('../middleware/require-admin');
const GroupController = require('../controllers/group.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }));

// routes for admins only
router.route('/').post(asyncHandler(GroupController.create));

router.route('/:groupId').delete(asyncHandler(GroupController.deleteGroup));
router.route('/:groupId/members').get(
    asyncHandler(GroupController.retrieveUsersFromGroup));

// routes for all types of users
router.route('/').get(asyncHandler(GroupController.retrieveAll));
router.route('/:groupId').get(asyncHandler(GroupController.retrieveOne));
router.route('/moderatedBy/:moderatorId').get(asyncHandler(GroupController.retrieveByModerator));
router.route('/membership/:memberId').get(asyncHandler(GroupController.retrieveByMember));

router.route('/:groupId/members/add/:userId').patch(
    asyncHandler(GroupController.addUserToGroup));

router.route('/:groupId/members/remove/:userId').patch(
    asyncHandler(GroupController.removeUserFromGroup));
