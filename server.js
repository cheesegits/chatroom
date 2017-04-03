var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var numberOfUsers = function() {
    io.of('/').clients(function(error, clients) {
        if (error) throw error;
        console.log(clients.length);
        io.emit('userCount', clients.length);
    });
}

io.on('connection', function(socket) {
    numberOfUsers();
    socket.broadcast.emit('message', 'User connected');
    socket.broadcast.emit('message', message);
});
socket.on('disconnect', function() {
    socket.broadcast.emit('message', 'User disconnected');
    numberOfUsers();
});
socket.on('message', function(message) {})

server.listen(process.env.PORT || 8080);