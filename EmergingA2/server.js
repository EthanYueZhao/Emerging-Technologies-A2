var express = require('express');
var app = express();
var path = require('path');
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render(__dirname + 'index.html');
});

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('send message', function (data) {
        var repMsg = 'Server: ' + data + ' at ' + new Date().toString();
        io.sockets.emit('get message', repMsg);
        console.log(repMsg);
    });


    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});