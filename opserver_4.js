var asePort = 1600; //hana server listening on this port
var backendport = 9090; //send to this port where ws is running
var net = require('net');
var WebSocket = require('ws');

function createWsocket() {
	var ws = new WebSocket('wss://10.162.65.105:9090', {
        rejectUnauthorized: false,
        origin: 'https://localhost:8080'
	});
	function handleFirstMessage(message){
		var backendSocket = require('net').Socket().connect({port : asePort});
		ws.on('backendConnect', prn);
		function prn(data) {console.log('connected to backend ' + asePort);}
		ws.emit('backendConnect');
		function finishFirstMessage() {
			backendSocket.write(message);		
			console.log('message sent to backend');

			ws.on('message', writeToSocket);
			
		}
		function writeToSocket(message){
			backendSocket.write(message);
		}
		backendSocket.on('connect', finishFirstMessage);
		backendSocket.on('data', function(data) {
			ws.send(data, { binary: true}); 
			console.log('data from backend sent to wsocket connection');
		});
	}
	ws.once('message', handleFirstMessage);
}
for (i=0; i<10; i++) {
	createWsocket();
	console.log('new ws connection created');
}