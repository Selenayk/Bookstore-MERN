import { Book } from '../models/book.js';

// Save a new book
export const saveBook = async (req, res) => {
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
};

// Get all books from the database
export const getAllBooks = async (req, res) => {
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
};

// Get one book from database by id
export const getOneBook = async (req, res) => {
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
};

// Update a book by id
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).json({
        message: 'Send all required fields: title, author, publishYear',
      });
    }

    // Update the book in the database
    const updatedBook = await Book.updateOne({ _id: id }, req.body);

    // Check if the book exists and was updated
    if (updatedBook.nModified === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Return success message
    return res
      .status(200)
      .json({ message: 'Book updated successfully', data: updatedBook });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Delete a book
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Book.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Book not found' });
    }

    return res.status(200).send({ message: 'Book deleted successfully' });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ message: 'Internal Server Error' });
  }
};
