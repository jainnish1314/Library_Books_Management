const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/library_mgmt', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected!"))
    .catch((error) => console.log(error));

const bookRoutes = require('./routes/books');

app.use('/books', bookRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
