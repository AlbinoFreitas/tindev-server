const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json({
        message: 'Welcome to this api.'
    });
});

module.exports = routes;