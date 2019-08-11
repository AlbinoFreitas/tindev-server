const express = require('express');

const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DislikeController = require('./controllers/DislikeController');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json({
        message: 'Welcome to this api.'
    });
});

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);
routes.get('/devs/:id', DevController.show);

routes.post('/devs/:id/likes', LikeController.store);
routes.post('/devs/:id/dislikes', DislikeController.store);

module.exports = routes;