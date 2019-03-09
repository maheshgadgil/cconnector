var net = require('net');

var server = net.createServer(function(socket) {
	socket.write('echo server \n' );
	socket.pipe(socket);
	console.log('after pipe');
});
server.listen(1337, '127.0.0.1');

