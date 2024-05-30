const express = require('express');
const mongoose = require('mongoose');
const postsRouter = require('./routes/posts');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose.connect('mongodb+srv://premanshu:premanshu123@cluster0.ljcnw8y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Routes
app.use('/api', postsRouter);



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
