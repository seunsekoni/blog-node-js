
const Post = require('../models/posts');
const Formidable = require('formidable');
// fileSystem
const fs = require('fs');

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