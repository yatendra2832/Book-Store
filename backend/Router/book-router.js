const express = require('express');
const router = express.Router();
const Book = require('../models/bookmodel');
// Home page
router.route('/')
    .get((req, res) => {
        res.send('<h1>Welcome to Book Store</h1>');
    })

//Route for getting all the books 
router.route('/books').get(
    async (req, res) => {
        try {
            const books = await Book.find();
            return res.status(200).send({
                count: books.length,
                data: books
            })

        } catch (error) {
            console.log(error.message);
            res.status(500).send({ message: error.message });
        }
    }
)
// Route for getting the books with id
router.route('/books/:id').get(
    async (req, res) => {
        try {
            const { id } = req.params;
            const book = await Book.findById(id);
            return res.status(200).send({
                data: book
            })

        } catch (error) {
            console.log(error.message);
            res.status(500).send({ message: error.message });
        }
    }
)
// Route For save a new book
router.route('/books').post(
    async (req, res) => {
        try {
            if (
                !req.body.title ||
                !req.body.author ||
                !req.body.publishYear
            ) {
                return res.status(400).send({ message: 'All fields are required' });
            }
            const newBook = new Book({
                title: req.body.title,
                author: req.body.author,
                publishYear: req.body.publishYear
            })

            const book = await Book.create(newBook);
            return res.status(201).send({ book });
        } catch (error) {
            console.log(error.message);
            return res.status(500).send({ message: err.message });
        }
    }
)

module.exports = router;