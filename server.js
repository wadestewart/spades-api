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
    // console.log('a user connected!', socket.id);
    socket.emit("userSocket", socket.id);

    // console the disconnection for testing
    socket.on('disconnection', () => {
        console.log('A user disconnected :sad_panda:');
    });
});

// listen for changes on app's port
server.listen(PORT, function() {
    console.log(`✅ PORT: ${PORT} 🌟`);
});
