const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: "Title is required",
        maxlength: 150,
        minlength: 4,
    },
    body: {
        type: String,
        required: "Body is required",
        maxlength: 2000,
        minlength: 4,
    },
    image: {
        type: Buffer,
        contentType: String // information about the image eg file format, image name
    },
    // relations with the user schema
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: Date
});

// "Post" will be the name of the model
module.exports = mongoose.model("Post", postSchema);
