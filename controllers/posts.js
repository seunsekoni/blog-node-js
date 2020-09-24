
const Post = require('../models/posts');
const Formidable = require('formidable');
const _ = require('lodash');
// fileSystem
const fs = require('fs');
const { exception } = require('console');
const { post } = require('../routes/auth');

exports.postById = (req, res, next, id) => {
    Post.findById(id)
        .populate("postedBy", "_id name email")
        .exec((err, post) => {
            if(err || !post) {
                return res.status(400).json({
                    error: err
                })
            }
            // append post to the request object
            req.post = post
            next();
        })
}

exports.getPosts = (req, res) => {
    const posts = Post.find()
        .populate("postedBy", "_id email name")
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

exports.createPost = (req, res, next) => {
    // upload files to the server
    let form = new Formidable.IncomingForm()
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        let post = new Post(fields)
        post.postedBy = req.profile
        
        if(files.image) {
            // store the binary format of the image in the db
            post.image = fs.readFileSync(files.image.path);
            // store the fileType also in the db
            post.image.contentType = files.image.type;
            console.log(post)
        }
        post.save((err, result) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            // let me = this.me
            // res.json({
            //     prof: me
            // })
            // console.log(post)
            res.json(result)
        })
    })
}

exports.postsByUser = (req, res) => {
    Post.find({postedBy: req.profile._id})
        .populate("postedBy", "_id name email")
        .sort("createdAt")
        .exec((err, posts) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(posts)
        })
}

exports.postDetail = (req, res) => {
    Post.findOne(req.post._id)
        .populate("postedBy", "_id name email")
        .sort("createdAt")
        .exec((err, posts) => {
            if(err) {
                return res.status(400).json({
                    error: err
                })
            }
            res.json(posts)
        })
}

exports.isPoster = (req, res, next) => {
    // check if the post exists


    // ascertain the conditions that ensures the
    //  creator of the post is the one deleting the post
    let isPoster = req.post.postedBy._id == req.auth.id;
    if(!isPoster) {
        return res.status(403).json({
            error: "You are not authorized for this operation",
        })
    }
    next()
    
}

exports.updatePost = (req, res, next) => {
    let post = req.post;
    post = _.extend(post, req.body);
    post.updatedAt = Date.now();
    post.save((err, result) => {
        if(err) {
            return res.status(400).json({
                error: "Unable to update post"
            })
        }
        return res.json({
            message: "Post updated successfully",
            post: result
        })
    })
}

exports.deletePost = (req, res) => {
    // console.log(res)
    let post = req.post
    console.log('is body '+ req.body)
    post.remove((err, deletedPost) => {
        if(err) {
            return res.status(400).json({
                error: "Post could not be found"
            })
        }
        res.json({
            message: "Post is deleted successfully"
        })
    })
}




// exports.me = function(req,res){
//     // if (req.headers && req.headers.authorization) {
//     //     var authorization = headers.authorization,
//     //         decoded;
//     //     try {
//     //         decoded = jwt.verify(authorization, process.env.JWT_TOKEN);
//     //     } catch (e) {
//     //         return res.status(401).send('unauthorized');
//     //     }
//     //     var userId = decoded.id;
//     //     // Fetch the user by id 
//     //     User.findOne({_id: userId}).then(function(user){
//     //         // Do something with the user
//     //         // return res.send(200);
//     //         return user;
//     //     });
//     // }
//     return "hello"
// }