// models/Product.js
const mongoose = require('mongoose');

// Define the schema for the Product document
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'], // Validation: must be present
        trim: true, // Clean up whitespace
        maxlength: [100, 'Product name cannot be more than 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price must be a positive number'] // Validation: minimum value
    },
    category: {
        type: String,
        required: false, // Optional
        enum: ['Electronics', 'Books', 'Clothing', 'Other'] // Validation: restricted to these values
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set creation date
    }
});

// Create and export the Model based on the schema
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;