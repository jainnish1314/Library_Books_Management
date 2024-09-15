import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddBook = () => {
    const [book, setBook] = useState({ bookid:'', title: '', author: '', year: '', genre: '' });
    const history = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/books', book);
            history('/'); // Navigate back to home page after adding book
        } catch (error) {
            alert("Failed to add Book")
            console.error('Error adding book:', error);
        }
    };

    return (
        <div>
            <h1>Add New Book</h1>
            <form onSubmit={handleSubmit}>
            <label>ID: </label>
                <input name="bookid" value={book.bookid} onChange={handleChange} required />
                <br />
                <label>Title: </label>
                <input name="title" value={book.title} onChange={handleChange} required />
                <br />
                <label>Author: </label>
                <input name="author" value={book.author} onChange={handleChange} required />
                <br />
                <label>Year: </label>
                <input name="year" type="number" value={book.year} onChange={handleChange} required />
                <br />
                <label>Genre: </label>
                <input name="genre" value={book.genre} onChange={handleChange} required />
                <br />
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBook;
