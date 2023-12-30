const express = require('express');
const router = express.Router();
const Book = require('../models/bookmodel');
// Home page
router.route('/')
    .get((req, res) => {
        res.send('<h1>Welcome to Book Store</h1>');
    })

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