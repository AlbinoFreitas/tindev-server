require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./src/routes');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const Dev = require("./src/models/Dev");

io.on('connection', sockect => {
    const { user } = sockect.handshake.query;
    
    Dev.findById(user).then(dev => {
        dev.isConnected = sockect.id;
        
        dev.save();
    
        sockect.on('disconnect', () => {
            dev.isConnected = null;

            dev.save();
        });
    });
});

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(routes);

async function start(){
    try{
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-9uoaa.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
            { useNewUrlParser: true }
        );
    
        await server.listen(process.env.PORT);

        console.log(`server running on port: ${process.env.PORT}`);
    }catch(error){
        console.log(error);
    }
}

start();