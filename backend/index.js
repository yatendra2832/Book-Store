require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// app.use(cors());//it will allow all origins with default of cors

app.use(
    cors({
        origin: "https://book-store-frontend-five.vercel.app/",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type"]
    })
);

// routes 
const bookRoute = require('./Router/book-router');

// Middlewares
app.use(express.json()); // Middleware for parsing request body
app.use('/api', bookRoute); // Middleware for routes

const PORT = process.env.PORT || 5500;
const URI = process.env.MONGODB_URL;
// Database connection
mongoose
    .connect(URI)
    .then(() => {
        console.log('connected to database successfully');
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
        })
    })
    .catch((err) => console.log(err))

