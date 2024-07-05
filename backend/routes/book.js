import express from 'express';
import * as bookController from '../controllers/book.js';

const router = express.Router();

router.post('/books', bookController.saveBook);

router.get('/books', bookController.getAllBooks);

router.get('/books/:id', bookController.getOneBook);

router.put('/books/:id', bookController.updateBook);

router.delete('/books/:id', bookController.deleteBook);

export default router;
