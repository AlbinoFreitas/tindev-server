const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const { user } = req.headers;
        const { id: devId } = req.params;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!loggedDev || !targetDev){
            return res.status(404).json({
                error: true,
                message: 'User not found'
            });
        }

        if(loggedDev.likes.includes(targetDev._id)){
            return res.json(loggedDev);
        }

        if(loggedDev.dislikes.includes(targetDev._id)){
            return res.status(422).json({
                error: true, 
                message: 'User already in dislikes list'
            });
        }

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        if(targetDev.likes.includes(loggedDev._id)){
            if(loggedDev.isConnected){
                req.io.to(loggedDev.isConnected).emit('match', targetDev);
            }

            if(targetDev.isConnected){
                req.io.to(targetDev.isConnected).emit('match', loggedDev);
            }
        }

        return res.json(loggedDev);
    }
}