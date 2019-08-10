require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const routes = require('./src/routes');

const port = process.env.PORT || 3000;

const app = express();

mongoose.connect(`
    mongodb+srv://albinitoatlasuser:${process.env.DB_PASSWORD}@cluster0-9uoaa.mongodb.net/tindev?retryWrites=true&w=majority
`, { useNewUrlParser: true });

app.use(express.json());
app.use(routes);

app.listen(port, () => {
    console.log(`server running on port: ${port}`);
});