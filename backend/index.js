const express = require('express');
const { PORT, mongoDBURL } = require('./config.js');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// app.use(cors());//it will allow all origins with default of cors

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"]
    })
);

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

