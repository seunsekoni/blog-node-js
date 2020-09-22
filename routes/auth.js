
// const { getPosts, createPost } = require('../controllers/posts');
const { signUp, signIn, signOut } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const express = require('express');
const router = express.Router()
const { userSignUpValidation, validate } = require("../validators");

router.post('/signup', userSignUpValidation(), validate, signUp);
router.post('/signin', signIn);
router.get('/signout', signOut);

// if it sees param :userId in the route, it calls the userById function
router.param('userId', userById)

module.exports = router;