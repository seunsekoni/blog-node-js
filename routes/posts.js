
const { getPosts, createPost, postsByUser, postById, 
        postDetail, isPoster, deletePost, updatePost} = require('../controllers/posts');
const express = require('express');
const router = express.Router()
const { createPostValidation, validate } = require("../validators");
const { authMiddleware } = require('../controllers/auth')
const { userById } = require('../controllers/user');

router.get('/', getPosts);
// router.post('/post', authMiddleware, createPostValidation(), validate, createPost);
router.post('/post', authMiddleware, createPostValidation(), createPost, validate, );
router.post('/post/new/:userId', authMiddleware, createPostValidation(), createPost, validate, );

router.get("/posts/by/:userId", authMiddleware, postsByUser)
router.get("/post/:postId", authMiddleware, postDetail)

router.put("/post/:postId", authMiddleware, isPoster, updatePost)
router.delete("/post/:postId", authMiddleware, isPoster, deletePost)

// if it sees param :userId in the route, it calls the userById function
router.param('userId', userById)

// if it sees param :userId in the route, it calls the postById function
router.param('postId', postById)

module.exports = router;