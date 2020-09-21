const mongoose = require('mongoose');

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
    }
});

// "Post" will be the name of the model
module.exports = mongoose.model("Post", postSchema);
