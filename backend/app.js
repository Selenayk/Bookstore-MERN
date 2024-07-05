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
