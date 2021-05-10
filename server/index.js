import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Initialize app
dotenv.config();
const app = express();

// App dependencies
app.use(bodyParser.urlencoded({
    limit: '30mb',
    extended: true
}));
app.use(bodyParser.json({
    limit: '30mb',
    extended: true
}));
app.use(cors());

// Root route response
app.get('/', (req, res) => {
    res.send("Welcome to the Chat App API");
});

const PORT = process.env.PORT || 5000;

// Start up the server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
});