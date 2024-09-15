import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
    const [book, setBook] = useState({});
    const { id } = useParams();

    useEffect(() => {
        fetchBook();
    }, []);

    const fetchBook = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/books/${id}`);
            setBook(response.data);
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    };

    return (
        <div>
            <h1>Book Details</h1>
            <p><strong>Title:</strong> {book.title}</p>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Year:</strong> {book.year}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <Link to="/">Back to Home</Link>
        </div>
    );
};

export default BookDetails;
