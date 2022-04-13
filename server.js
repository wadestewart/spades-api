// setting up the express server
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const PORT = process.env.PORT || 3050;

// create the app
const app = express();

// create the http server for socket connections
const server = http.createServer(app);

const io = socketIo(server, { 
    cors: {
      origin: "http://localhost:3000"
    }
}) //in case server and client run on different urls

// set up the socket connection
io.on('connection', (socket) => {
    // emitting the socket id to the client
    socket.emit("userSocket", socket.id);

    // receiving the user's name 
    socket.on('player', player => {
        console.log('a user connected!', player);
    })
});

// listen for changes on app's port
server.listen(PORT, function() {
    console.log(`✅ PORT: ${PORT} 🌟`);
});
