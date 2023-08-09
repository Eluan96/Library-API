"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksControllers_1 = require("../Controllers/booksControllers");
const auth_1 = require("../utils/auth");
const router = express_1.default.Router();
router.post('/create', auth_1.auth, booksControllers_1.createBook); //create a new book and add to database
router.get('/getbooks', auth_1.auth, booksControllers_1.getAllBooks); //get all books from the database
router.put('/update', auth_1.auth, booksControllers_1.updateBook); //update any book in the database
router.delete('/delete', auth_1.auth, booksControllers_1.deleteBook); //delete a book from the database
router.get('/getbooks:id', booksControllers_1.getBookInfo); //getting information of any book in the database.
exports.default = router;
