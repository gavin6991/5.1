// server.js
const express = require('express');
const connectDB = require('./db');
const Product = require('./models/Product'); // Import the Product model

// Connect to the database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies (essential for POST and PUT requests)
app.use(express.json());

// --- 1. CREATE (Add a new product) ---
app.post('/api/products', async (req, res) => {
    try {
        // req.body contains the product data sent from the client
        const newProduct = new Product(req.body); 
        const product = await newProduct.save(); // Save the new document to the database
        
        // Respond with the created product and 201 Created status
        res.status(201).json(product);
    } catch (err) {
        // Handle validation errors (e.g., missing required field)
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: 'Server error during product creation' });
    }
});

// --- 2. READ (Retrieve all products) ---
app.get('/api/products', async (req, res) => {
    try {
        // Use .find({}) to retrieve all documents in the collection
        const products = await Product.find({});
        // Respond with the list of products
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: 'Server error during product retrieval' });
    }
});

// --- 3. UPDATE (Update a product by ID) ---
app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the product ID from the URL parameter
        
        // Find the product by ID and update it.
        // { new: true } returns the updated document instead of the old one.
        // { runValidators: true } ensures Mongoose runs the schema validations on the update data.
        const updatedProduct = await Product.findByIdAndUpdate(
            id, 
            req.body, 
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(updatedProduct);
    } catch (err) {
        // Handle potential errors like invalid ID format or validation errors
         if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid product ID format' });
        }
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: 'Server error during product update' });
    }
});

// --- 4. DELETE (Delete a product by ID) ---
app.delete('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the product by ID and delete it
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Respond with a 204 No Content status for successful deletion
        res.status(204).send(); 
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ error: 'Invalid product ID format' });
        }
        res.status(500).json({ error: 'Server error during product deletion' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});