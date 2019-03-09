var WebSocket= require('ws');
var http = require('http');


var server = http.createServer().listen(8085);
var wsArray = [];
var wsTobeAssigned = 0;
function createWsConn() {
	wsArray.push(
		new WebSocket('wss://localhost:8080', 
		{rejectUnauthorized : false}
		)

	);
		console.log('adding connection and pushing to the array \n');
		console.log('length of array ' + wsArray.length);
}


server.on('request',  function(request, response) {
	console.log('val of wsTobeAssigned '  + wsTobeAssigned);
	createWsConn();
	var ws = wsArray[wsTobeAssigned];
		
	console.log('length of array ' + wsArray.length);
	ws.on('open', function() {
		ws.send('testing');
		ws.send('assigned ' + wsTobeAssigned );
	});
	ws.on('message', function(message) {
		console.log('received: %s ', message);
	} );
	wsTobeAssigned = wsTobeAssigned + 1;
});

