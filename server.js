// setting up the express server
const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const cors = require('cors');
const IO_PORT = process.env.PORT || 3050;
const APP_PORT = process.env.PORT || 3051;

// create the app
const app = express();
app.use(cors());

// create the http server for socket connections
const server = http.createServer(app);

const io = socketIo(server, { 
    cors: {
        origin: 'http://localhost:3000'
    }
}) //in case server and client run on different urls

const players = [];
// set up the socket connection
io.on('connection', (socket) => {
    // emitting the socket id to the client
    socket.emit('userSocket', socket.id);

    // receiving the player object, and pushing it into the players array
    socket.on('player', (player, callback) => {
        // push the new player into the 
        players.push(player);
        io.emit('players', players);
    })
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

// listen for changes on app's port
server.listen(IO_PORT, function() {
    console.log(`✅ PORT: ${IO_PORT} 🌟`);
});

// listen for changes on app's port
app.listen(APP_PORT, function() {
    console.log(`✅ PORT: ${APP_PORT} 🌟`);
});
