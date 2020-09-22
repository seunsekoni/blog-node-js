
const express = require('express');
const { authMiddleware } = require('../controllers/auth')
const router = express.Router()
const { userById, allUsers, getUser } = require('../controllers/user');

router.get('/users', allUsers)
router.get('/user/:userId', authMiddleware, getUser)
// if it sees param :userId in the route, it calls the userById function
router.param('userId', userById)

module.exports = router;