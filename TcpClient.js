var net = require('net');

var client = new net.Socket();
client.connect({host:'127.0.0.1',port:1337});

client.on('connect', function() {
	client.write('hello from client');
	client.on('data', function(data) {
	console.log('received from server ' + data);
	});
});



