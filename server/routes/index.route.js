const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const examRoutes = require('./exam.route');
const questionRoutes = require('./question.route');
const groupRoutes = require('./group.route');
const topicRoutes = require('./topic.route');


const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/exam', examRoutes);
router.use('/exam', questionRoutes);
router.use('/group', groupRoutes);
router.use('/topic', topicRoutes);



module.exports = router;
