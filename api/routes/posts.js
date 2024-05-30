const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const multer = require('multer');

// Set up multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the destination folder where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Rename the file to avoid conflicts
    }
});

// Create multer instance
const upload = multer({ storage: storage });

router.post('/posts', upload.single('image'), async (req, res) => {
    try {
        const { userID, username, title, description } = req.body;
        const image = req.file.filename; // Retrieve the filename of the uploaded image
        const post = new Post({ userID, username, title, description, image });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single post
router.get('/posts/:id', getPost, (req, res) => {
    res.json(res.post);
});

// Update a post
router.patch('/posts/:id', getPost, async (req, res) => {
    if (req.body.userID != null) {
        res.post.userID = req.body.userID;
    }
    if (req.body.username != null) {
        res.post.username = req.body.username;
    }
    if (req.body.title != null) {
        res.post.title = req.body.title;
    }
    if (req.body.description != null) {
        res.post.description = req.body.description;
    }
    if (req.body.image != null) {
        res.post.image = req.body.image;
    }
    try {
        const updatedPost = await res.post.save();
        res.json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a post
router.delete('/posts/:id', getPost, async (req, res) => {
    try {
        await res.post.remove();
        res.json({ message: 'Deleted post' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware to get post by ID
async function getPost(req, res, next) {
    try {
        const post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
        res.post = post;
        next();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = router;
