// db.js
const mongoose = require('mongoose');
require('dotenv').config(); // To load environment variables from .env file

// Define your MongoDB connection URI
// You should store this securely in a .env file
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/productDB';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            // These options are often recommended for newer Mongoose versions
            // useNewUrlParser: true, 
            // useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error(`MongoDB connection failed: ${err.message}`);
        // Exit process with failure
        process.exit(1); 
    }
};

module.exports = connectDB;