import express, { Request, Response, NextFunction } from 'express'
import {v4} from 'uuid';
import path from 'path';
import fs from 'fs';

let booksFolder = path.join(__dirname, "../../src/booksDatabase");
let booksFile = path.join( booksFolder, "bookDatabase.json");

// To create a new Book and save to the database
export const createBook = (req: Request, res: Response, next: NextFunction ) => {
    try {
        // create the booksDatabase dynamically 
        if(!fs.existsSync(booksFolder)){
            fs.mkdirSync(booksFolder)
        }
        if(!fs.existsSync(booksFile)){
            fs.writeFileSync(booksFile, " ")
        }

        // read from database
        let allBooks: any[] = [];
        try {
            const infos = fs.readFileSync(booksFile, 'utf8')
            if(!infos){
                return res.status(400).json({
                    message: `Cannot read this file`
                })
            }else{
                allBooks = JSON.parse(infos)
            }
        } catch (parseError) {
            allBooks = [];
        }

        const {
            title,
            author,
            datePublished,
            description,
            pageCount,
            genre,
            bookId, 
            publisher,
        } = req.body

        let existingBooks = allBooks.find((book) => book.title === title);
        if(existingBooks){
            return res.send({ message: `Book already exists`})
        }

        let newBookInfo = {
            title: title,
            author: author,
            datePublished: datePublished,
            description: description,
            pageCount: pageCount,
            Genre: genre,
            bookId: v4(), 
            publisher: publisher,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        allBooks.push(newBookInfo)

        fs.writeFile(booksFile, JSON.stringify(allBooks, null, 2), 'utf8', (err) => {
            if(err){
                return res.status(500).json({ message: `Your book cannot be updated to the database`})
            }else{
                return res.status(200).json({ 
                    message: `You have successfully uploaded your book to the database`,
                    newBookInfo
                })
            }
        })

    } catch (error) {
        console.log(error)
    }
}

// GET ALL BOOKS FROM THE DATABASE
export const getAllBooks = (req: Request, res: Response, next: NextFunction) => {
    try {
        const infos = fs.readFileSync(booksFile, 'utf8');
        const allBooks = JSON.parse(infos);
        return res.status(200).json(allBooks)
    } catch (err) {
        return res.status(500).json({ message: `Failed to retrieve books from the database`})
    }
}

// Edit a Book or Update it based on id - UPDATE Request
export const updateBook = (req: Request, res: Response, next: NextFunction) => {
    try {
       // const bookId = req.params.id
        const {
            title,
            author,
            datePublished,
            description,
            pageCount,
            genre,
            publisher,
        } = req.body;

        const infos = fs.readFileSync(booksFile, 'utf8');
        const allBooks = JSON.parse(infos);

        const book = allBooks.find((book: any) => book.title === title);
        if(!book){
            return res.status(404).json({message: 'Book not found'})
        }

        const updatedBook = {
            ...book,
            title,
            author,
            datePublished,
            description,
            pageCount,
            genre,
            publisher,
            updatedAt: new Date()
        }

        const updatedBooks = allBooks.map((book:any) => {
            if(book.title === title){
                return updatedBook;
            } else {
                return book
            }
        })

        fs.writeFile(booksFile, JSON.stringify(updatedBooks, null, 2), 'utf-8', (err) => {
            if(err){
                return res.status(500).json({message: 'Failed to update book'});
            } else {
                return res.status(200).json({message: 'Book updated successfully', updatedBook})
            }
        })

    } catch (err) {
        return res.status(500).json({ message: `Cannot update book`})
    }
}

//Delete a book from database using the title
export const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    try{
        const { title } = req.body;

        const info = fs.readFileSync(booksFile, 'utf-8');
        const allBooks = JSON.parse(info);

        const book = allBooks.find((book: any) => book.title === title)
        if(!book){
            return res.status(404).json({message: 'Book not found'})
        }

        const updatedBooks = allBooks.filter((book: any) => book.title !== title);

        fs.writeFile(booksFile, JSON.stringify(updatedBooks, null, 2), 'utf-8', (err) => {
            if(err){
                return res.status(500).json({message: 'Failed to delete book'})
            } else {
                return res.status(200).json({message: 'Book deleted successfully'})
            }
        })

    }catch(err){
        res.status(500).json({message: 'Failed to delete book'})
    }
};

//Getting the information of a book using the ID
export const getBookInfo = (req: Request, res: Response, next: NextFunction) => {
    try{
        const bookId = req.params.id;
        const info = fs.readFileSync(booksFile, 'utf-8');
        const allBooks = JSON.parse(info);

        const book = allBooks.find((book: any) => book.bookId === bookId);
        if(!book){
            res.status(400).send({message:'Book not found'})
        } 

        res.status(200).json(book)

    }catch(err){
        res.status(500).json({message: 'Could not retrieve book information'})
    }
}