var net = require('net');

var server = net.createServer(function(socket) {
	console.log("serer started");
	socket.pipe(socket);
});

server.listen(1337, '127.0.0.1');
