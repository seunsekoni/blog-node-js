
const { getPosts, createPost } = require('../controllers/posts');
const express = require('express');
const router = express.Router()
const { createPostValidation, validate } = require("../validators");
const { authMiddleware } = require('../controllers/auth')

router.get('/', authMiddleware, getPosts);
router.post('/post', createPostValidation(), validate, createPost);

module.exports = router;