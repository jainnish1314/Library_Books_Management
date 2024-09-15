const express = require('express');
const router = express.Router();
const Book = require('../model/item');

//Retrieve all details books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Retrieve a specific book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findOne({ bookid: req.params.id });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new book
router.post('/', async (req, res) => {
    const newBook = new Book(req.body);

    try {
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an existing book by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findOneAndUpdate(
            { bookid: req.params.id },
            req.body,
            { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Delete a book by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findOneAndDelete({ bookid: req.params.id });
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
