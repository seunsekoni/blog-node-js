
const express = require('express');
const { authMiddleware } = require('../controllers/auth')
const router = express.Router()
const { userById, allUsers, getUser, updateUser, deleteUser } = require('../controllers/user');

router.get('/users', allUsers)
router.get('/user/:userId', authMiddleware, getUser)
router.put('/user/:userId', authMiddleware, updateUser)
router.delete('/user/:userId', authMiddleware, deleteUser)
// if it sees param :userId in the route, it calls the userById function
router.param('userId', userById)

module.exports = router;