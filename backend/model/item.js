const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    bookid:{type: String, required: true},
    title: { type: String, required: true },
    author: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true }
});

module.exports = mongoose.model('Book', BookSchema);
