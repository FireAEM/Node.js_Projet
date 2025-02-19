const express = require('express');
const Book = require('./models/book');
require('dotenv').config();

const app = express();
app.use(express.json());
