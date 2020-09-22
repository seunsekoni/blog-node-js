
const express = require('express');
const router = express.Router()
const { userById, allUsers } = require('../controllers/user');

router.get('/users', allUsers)
// if it sees param :userId in the route, it calls the userById function
router.param('userId', userById)

module.exports = router;