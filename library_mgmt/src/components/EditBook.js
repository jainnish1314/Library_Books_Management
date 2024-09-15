import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditBook = () => {
    const [book, setBook] = useState({ bookid:'', title: '', author: '', year: '', genre: '' });
    const { id } = useParams();
    const history = useNavigate();

    useEffect(() => {
        fetchBook();
    }, []);

    const fetchBook = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/books/${id}`);
            setBook(response.data);
        } catch (error) {
            console.error('Error fetching book:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/books/${id}`, book);
            history('/'); // Navigate back to home page after editing book
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    return (
        <div>
            <h1>Edit Book</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Update Book</button>
            </form>
        </div>
    );
};

export default EditBook;
