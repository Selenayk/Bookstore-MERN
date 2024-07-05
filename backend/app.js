import express from 'express';
import { PORT, mongoDBUrl } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/book.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);
  return res.status(200).send('Welcome to MERN project.');
});

// Route for saving a new book
app.post('/books', async (req, res) => {
  const { title, author, publishYear } = req.body;

  // Validate required fields
  if (!title || !author || !publishYear) {
    return res.status(400).json({
      message: 'Send all required fields: title, author, publishYear',
    });
  }

  try {
    const newBook = { title, author, publishYear };

    const book = await Book.create(newBook);
    return res.status(201).send(book); // Return the created book with a 201 status code
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route for getting all books from the database
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route for getting one book from database by id
app.get('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
});

// Route for updating a book by id
app.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { title, author, publishYear } = req.body;
    if (!title || !author || !publishYear) {
      return res.status(400).json({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    // Update the book in the database
    const updatedBook = await Book.findByIdAndUpdate(id, req.body);

    // Check if the book exists and was updated
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Return success message
    return res.status(200).json({ message: 'Book updated successfully' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
});

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log('Connected to database.');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
