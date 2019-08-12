require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./src/routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-9uoaa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`server running on port: ${process.env.PORT}`);
    });
}).catch(err => {
    console.log(err);
});
