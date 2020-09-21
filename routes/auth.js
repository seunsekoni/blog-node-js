
// const { getPosts, createPost } = require('../controllers/posts');
const { signUp, signIn, signOut } = require('../controllers/auth');
const express = require('express');
const router = express.Router()
const { userSignUpValidation, validate } = require("../validators");

router.post('/signup', userSignUpValidation(), validate, signUp);
router.post('/signin', signIn);
router.get('/signout', signOut);

module.exports = router;