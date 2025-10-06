const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'], 
        trim: true, 
        maxlength: [100, 'Product name cannot be more than 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price must be a positive number'] 
    },
    category: {
        type: String,
        required: false, 
        enum: ['Electronics', 'Books', 'Clothing', 'Other'] 
    },
    createdAt: {
        type: Date,
        default: Date.now 
    }
});
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
