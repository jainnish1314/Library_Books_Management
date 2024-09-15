import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';


const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const deleteBook = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/books/${id}`);
            fetchBooks(); 
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return (
        <Container>
        <Row className="my-4">
            <Col>
                <h1 className="text-center">Library</h1>
                <div className="d-flex justify-content-end mb-3">
                    <Link to="/add">
                        <Button variant="primary">Add New Book</Button>
                    </Link>
                </div>
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Book ID</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Year</th>
                            <th>Genre</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.bookid}>
                                <td>{book.bookid}</td>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.year}</td>
                                <td>{book.genre}</td>
                                <td>
                                    <Link to={`/edit/${book.bookid}`}>
                                        <Button variant="warning" className="me-2">
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        onClick={() => deleteBook(book.bookid)}
                                        className="me-2"
                                    >
                                        Delete
                                    </Button>
                                    <Link to={`/book/${book.bookid}`}>
                                        <Button variant="info">View Details</Button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
        </Row>
    </Container>
    );
};

export default Home;
