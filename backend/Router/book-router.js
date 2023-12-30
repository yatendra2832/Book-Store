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
            return res.status(200).send(book)

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

// Route for updating the book
router.route('/books/:id').put(
    async (req, res) => {
        try {
            if (
                !req.body.title ||
                !req.body.author ||
                !req.body.publishYear
            ) {
                return res.status(400).send({ message: 'All fields are required' });
            }
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send({ message: 'Invalid ObjectId format' });
            }

            const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
            if (!book) {
                return res.status(404).send({ message: 'Book not found' });
            }

            return res.status(200).send({ message: "Book Updated Successfully" });

        } catch (error) {
            console.log(error.message);
            return res.status(500).send({ message: err.message });
        }
    }
)

// Route for deleting the books
router.route('/books/:id').delete(
    async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send({ message: 'Invalid ObjectId format' });
            }

            const deletedbook = await Book.findByIdAndDelete(id);
            if (!deletedbook) {
                return res.status(404).send({ message: "Book not found" });
            }
            return res.status(200).send({ message: "Book deleted Successfully" });
        } catch (error) {
            console.log(error.message);
            return res.status(500).send(error.message);
        }
    }
)

module.exports = router;