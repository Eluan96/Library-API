import express from 'express';
import { createBook, getAllBooks, updateBook, deleteBook, getBookInfo } from '../Controllers/booksControllers';
import { auth } from '../utils/auth';
const router = express.Router();

router.post('/create', auth, createBook); //create a new book and add to database
router.get('/getbooks', auth, getAllBooks); //get all books from the database
router.put('/update', auth, updateBook) //update any book in the database
router.delete('/delete', auth, deleteBook) //delete a book from the database
router.get('/getbooks:id', getBookInfo) //getting information of any book in the database.

export default router;