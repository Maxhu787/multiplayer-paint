const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  socket.on('user-connect', (ip) => {
    console.log(`${ip} connected`);
    io.emit('user-connect', ip);
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
io.on('connection', (socket) => {
    socket.on('paint', (paintDetails) => {
        io.emit('paint', paintDetails);
  });
})

server.listen(3000, () => {
  console.log('listening on *:3000');
});