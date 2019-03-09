var listenport1 = 8085; //listens for isql commands
var listenport2 = 8086; //listens for isql commands

var net = require('net');
var WebSocket = require('ws');

//var ws = new WebSocket('ws://localhost:8080');

function tunnelSocketHandler1(incomingSocket)
{
    console.log("TUNNEL connecting to server");
	var ws = new WebSocket('wss://10.162.71.230:9090/data1', {
		rejectUnauthorized: false,
		origin: 'https://localhost:8080'
	});
	ws.on('connection', function() {console.log('connected');});
	ws.on('message', function(data, flags){
	console.log('received msg from the websocket server' + '\n');
		incomingSocket.write(data);
	});
	ws.on('error', function(error) {
		 console.log('Connect Error: ' + error.toString());
		 ws.close();
	});
    function sendClientDataToServer(data)
    {
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
		console.log(ws.readyState);
		if (ws.readyState === 1)
		{
			console.log('writing data on websocket because it is in ready state + "\n"');
			ws.send(data, { binary: true});
		}
		
		ws.on('open', function open() {
			console.log('writing data on websocket + "\n"');
			ws.send(data, { binary: true});
		});

		console.log('after sending');
			//ws.close();
	};


    incomingSocket.on('data', sendClientDataToServer);

}

function tunnelSocketHandler2(incomingSocket)
{
    console.log("TUNNEL connecting to server");
	var ws = new WebSocket('wss://localhost:9090/data2', {
		rejectUnauthorized: false,
		origin: 'https://localhost:8080'
	});
	ws.on('connection', function() {console.log('connected');});
	ws.on('message', function(data, flags){
	console.log('received msg from the websocket server' + '\n');
		incomingSocket.write(data);
	});
	ws.on('error', function(error) {
		 console.log('Connect Error: ' + error.toString());
		 ws.close();
	});
    function sendClientDataToServer(data)
    {
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
		console.log(ws.readyState);
		if (ws.readyState === 1)
		{
			console.log('writing data on websocket because it is in ready state + "\n"');
			ws.send(data, { binary: true});
		}
		
		ws.on('open', function open() {
			console.log('writing data on websocket + "\n"');
			ws.send(data, { binary: true});
		});

		console.log('after sending');
			//ws.close();
	};


    incomingSocket.on('data', sendClientDataToServer);
	//incomingSocket.on('end', ws.close);
    //incomingSocket.on('end', backendSocket.end);
}
//net.createServer(echoServer).listen(backendPort);
net.createServer(tunnelSocketHandler1).listen(listenport1);
net.createServer(tunnelSocketHandler2).listen(listenport2);