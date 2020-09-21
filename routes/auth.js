
// const { getPosts, createPost } = require('../controllers/posts');
const { signUp } = require('../controllers/auth');
const express = require('express');
const router = express.Router()
const { userSignUpValidation, validate } = require("../validators");

router.post('/signup', userSignUpValidation(), validate, signUp);

module.exports = router;