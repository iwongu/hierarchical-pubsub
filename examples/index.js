var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var pubsub = require('../lib/pubsub');
require('./light');
require('./display');
require('./controller');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var clients = {};

var living_room_motion_1 = pubsub('motion/living_room/1');
var living_room_light = pubsub('light/living_room');
var living_room_display = pubsub('display/living_room');

io.on('connection', function (socket) {
  clients[socket.id] = socket;
  socket.
    on('disconnect', function() {
      delete clients[socket.id];
    }).
    on('motion', function(msg) {
      living_room_motion_1.setValue(msg);
    });
});

var broadcast = function(event, msg) {
  for (var client in clients) {
    clients[client].emit(event, msg);
  }
};

living_room_light.
  on('value', function(data) {
    broadcast('light', data.event + ': ' + data.value.status);
  });

living_room_display.
  on('value', function(data) {
    broadcast('display', data.event + ': ' + data.value.message);
  });

server.listen(3000, function() {
  console.log('listening on *:3000');
});

