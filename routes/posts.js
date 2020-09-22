
const { getPosts, createPost } = require('../controllers/posts');
const express = require('express');
const router = express.Router()
const { createPostValidation, validate } = require("../validators");
const { authMiddleware } = require('../controllers/auth')
const { userById } = require('../controllers/user');

router.get('/', getPosts);
router.post('/post', authMiddleware, createPostValidation(), validate, createPost);

// if it sees param :userId in the route, it calls the userById function
router.param('userId', userById)

module.exports = router;