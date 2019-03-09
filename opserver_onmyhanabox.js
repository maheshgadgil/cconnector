var listenport = 8085; //listens for isql commands
var backendport = 9090; //send to this port where ws is running
var net = require('net');
var WebSocket = require('ws');

//var ws = new WebSocket('ws://localhost:8080');

function tunnelSocketHandler(incomingSocket)
{
    console.log("TUNNEL connecting to server");
	//var ws = new WebSocket('wss://mo-8814c2532.mo.sap.corp:9090', {
	var ws = new WebSocket('wss://10.162.65.105:9090', {
		rejectUnauthorized: false,
		origin: 'https://localhost:8080'
	});
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
net.createServer(tunnelSocketHandler).listen(listenport);
