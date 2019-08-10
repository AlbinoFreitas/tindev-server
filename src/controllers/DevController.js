const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
    async store (req, res) {
        const { username } = req.body;

        const user = await Dev.findOne({ user: username });

        if(user){
            return res.json(user);
        }

        let response = {};
        
        try {
            response = await axios.get(`https://api.github.com/users/${username}`);
        } catch (error) {
            return res.status(404).json({
                error: true,
                message: 'User not found'
            });
        }

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });

        return res.json(dev);
    }
}