var asePort = 1800; //sql server listening on this port
var backendport = 9090; //send to this port where ws is running
var net = require('net');
var WebSocket = require('ws');
var backendSocket = require('net').Socket();
console.log("backendSocket = " + backendSocket.toString());



backendSocket.connect({port : asePort});
//var ws = new WebSocket('ws://localhost:8080');


console.log("TUNNEL connecting to server");
var ws = new WebSocket('wss://10.97.167.220:9090', {
	rejectUnauthorized: false,
	origin: 'https://localhost:8080'
});
ws.on('message', function(data, flags){
	console.log('received msg from the websocket server' + '\n');
	backendSocket.write(data);
	//backendSocket.end();
	console.log('after sending to aseport' + '\n');
});
ws.on('error', function(error) {
	 console.log('Connect Error: ' + error.toString());
	 ws.close();
});
//net.createServer(sendServerDataToClient).listen(asePort);

function sendServerDataToClient()
{
	//incomingSocket.on('data', function() {
	console.log(ws.readyState);
	if (ws.readyState === 1)
	{
		console.log('writing data on websocket because it is in ready state + "\n"');
		ws.send(data, { binary: true});
	}
	
	//incomingSocket.on('end', backendSocket.end);
	
	
	
	console.log("data object type = " + Object.prototype.toString.call(data));
	console.log("TUNNEL incomingSocket data event data.length = " + data.length + "\n");
	
	console.log('after ws');
	//ws.send(data);
	//var array = new Float32Array(5);

	//for (var i = 0; i < array.length; ++i) {
	//	array[i] = i / 2;
	//}

	//ws.send(array, { binary: true, mask: true });
	//console.log("data received " + data);
	//ws.send(data);

/*		
	ws.on('open', function open() {
		console.log('writing data on websocket + "\n"');
		//ws.send(data, { binary: true});
	});
*/
	console.log('after sending');
		//ws.close();
}


backendSocket.on('data', sendServerDataToClient);
//incomingSocket.on('end', ws.close);
//incomingSocket.on('end', backendSocket.end);


