
const Post = require('../models/posts');

exports.getPosts = (req, res) => {
    const posts = Post.find()
        .select("_id body title")
    .then((posts) => {
        res.json({
            posts
        });
    })
    .catch((err) => {5
        console.log(err);
    })
    ;
}

exports.createPost = (req, res) => {
    
    const post = new Post(req.body);
    console.log('Post Created:', req.body);
    post.save()
        .then(result => {
        // if(err) {
        //     return res.status(400).json({
        //         error: err
        //     })
        // }
        res.status(200).json({
            post: result
        })
    })
    .catch((err) => {
        console.log(err)
    })
}