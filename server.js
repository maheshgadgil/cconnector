var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({ port: 8080 });
var backendport = 1600; //ASE listening on this port
var incomingport = 8085;

var net = require('net');


//var incomingSocket = require('net').Socket();


wss.on('connection', function connection(ws) {
  console.log("TUNNEL connecting to server");
	var backendSocket = require('net').Socket();
	backendSocket.connect({port : incomingport});
	console.log("after connecting");
  //console.log("backendSocket = " + backendSocket.toString());

   //connected to ASE port
/*
  function sendServerDataToClient(data)
  {
    console.log("TUNNEL backendSocket data event data.length = " + data.length + "\n");
	console.log("writing response data back on websocket " + data.length + "\n");
    ws.send(data, { binary: true});
  }
*/  
  //backendSocket.on('data', sendServerDataToClient);
  //backendSocket.on('end', incomingSocket.end);
  //backendSocket.on('error', incomingSocket.end);
  
	ws.on('message', function incoming(message) {
		//console.log('received: %s', message);
		console.log('msg received on the websocket ' + message);
		//ws.send('echo back');
		//backendSocket.write(message); //writing to ASE
		//incomingSocket.connect({port : incomingport});


		// ws.on('close', function wsclose() {
		//	console.log('disconnected');
	//	backendSocket.end();
	//  });
	});
	backendSocket.on('error', function() {
		console.log('error occured here');
	});
	backendSocket.on('data', function outgoing(data) {
		console.log('inside backendsocket ');
		ws.send(data, { binary: true});
	});
});

