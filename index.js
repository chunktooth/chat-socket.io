var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	io.emit('userConnected', `A new user, ${Date.now()}, has connected.`)

  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', `${msg.name}: ${msg.text}`);
  });

	socket.join('chatroom');
	io.to('chatroom').emit('Welcome aboard!');

	socket.on('disconnect', function(msg) {
		io.emit('userDisconnected', 'A user has disconnected');
	});
});

http.listen(3000, function(){
  console.log('listening on *: 3000');
});
      