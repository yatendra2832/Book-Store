import express from 'express';
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose';

const app = express();

app.get('/', (req, res) => {
    return res.status(200).send('<h1>Hello World!</h1>');
})


mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('connected to database successfully');
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`);
        })
    })
    .catch((err) => console.log(err))

