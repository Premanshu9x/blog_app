const mongoose = require('mongoose');

// Define schema
const postSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String, // assuming you store image URLs
        required: true
    }
});

// Define model
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
