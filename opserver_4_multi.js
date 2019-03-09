var asePort = 1600; //hana server listening on this port
var hanaPort = 30015;

var net = require('net');
var WebSocket = require('ws');

var portArr = [asePort, hanaPort];
var conn = [];
var wsArray = [];


//var tunnel = require('tunnel');

function createWsocket(item, index) {
	var ws = new WebSocket('wss://10.162.65.105:9090', {
        rejectUnauthorized: false,
        origin: 'https://localhost:8080'
	});
			
		conn["port"] = item;
		conn["socket"] = ws;
		wsArray[index] = conn;
	function handleFirstMessage(message){
		var backendSocket = require('net').Socket().connect({port : wsArray[index].conn.port});
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
//for (i=0; i<10; i++) {
portArr.forEach(createWsocket);
