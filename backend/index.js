const express = require('express');
const { PORT, mongoDBURL } =require('./config.js');
const mongoose = require('mongoose');


const app = express();

// routes 
const bookRoute = require('./Router/book-router');

// Middlewares
app.use(express.json()); // Middleware for parsing request body
app.use('/api', bookRoute); // Middleware for routes

// Database connection
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('connected to database successfully');
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
        })
    })
    .catch((err) => console.log(err))

