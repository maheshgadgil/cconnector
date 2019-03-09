var WebSocket = require('ws');
var writeToPort = 1600;
var writeToSocket = require('net').Socket();

var ws = new WebSocket('ws://localhost:8080');
//var ws = new WebSocket('wss://echo.websocket.org');
ws.on('open', function open() {

  ws.send('Hello');
  console.log('after sent');
  
});

ws.on('message', function(data, flags) {
  // flags.binary will be set if a binary data is received.
  // flags.masked will be set if the data was masked.
    console.log('received: %s', data);
	writeToSocket.connect({port: writeToPort});
	writeToSocket.write(data);
	console.log('after writing back');
});

    //console.log("TUNNEL connecting to server");

    //var backendSocket = require('net').Socket();
    //console.log("backendSocket = " + backendSocket.toString());

    //backendSocket.connect({port : backendport});
