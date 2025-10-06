const mongoose = require('mongoose');
require('dotenv').config(); 
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/productDB';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
        });
        console.log('MongoDB connected successfully!');
    } catch (err) {
        console.error(`MongoDB connection failed: ${err.message}`);
        
        process.exit(1); 
    }
};
module.exports = connectDB;
