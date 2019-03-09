var WebSocketServer = require('ws').Server;
var fs = require('fs');

var cfg = {
	ssl: true,
	port: 9090,
	ssl_key: 'key.pem',
	ssl_cert: 'server.crt'
};

var httpServ = ( cfg.ssl ) ? require('https') : require('http');

//var http = require('http');
    // dummy request processing
var processRequest = function( req, res ) {

    res.writeHead(200);
    res.end("All glory to WebSockets!\n");
};
if ( cfg.ssl ) {

    server = httpServ.createServer({

        // providing server with  SSL key/cert
        key: fs.readFileSync( cfg.ssl_key ),
        cert: fs.readFileSync( cfg.ssl_cert )

    }, processRequest ).listen( cfg.port );
	console.log("server started");
    } else {

        server = httpServ.createServer( processRequest ).listen( cfg.port );
    }
/*	
var server = httpServ.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function() {
    console.log((new Date()) + ' Server is listening on port 8080');
});
*/
var wss_1 = new WebSocketServer({
    server: server, path: '/data1'
});
var wss_2 = new WebSocketServer({
    server: server, path: '/data2'
});

var backendport = 1600; //ASE listening on this port


var net = require('net');

//var incomingSocket = require('net').Socket();

wss_1.on('connection', function connection(ws) {
  console.log("TUNNEL connecting to server");
  backendSocket = require('net').Socket();

  console.log("backendSocket = " + backendSocket.toString());

  backendSocket.connect({port : backendport}); //connected to ASE port
	
  function sendServerDataToClient(data)
  {
    console.log("TUNNEL backendSocket data event data.length = " + data.length + "\n");
	console.log("writing response data back on websocket " + data.length + "\n");
    ws.send(data, { binary: true});
  }
  
  backendSocket.on('data', sendServerDataToClient);
  //backendSocket.on('end', incomingSocket.end);
  //backendSocket.on('error', incomingSocket.end);
  
  ws.on('message', function incoming(message) {
    //console.log('received: %s', message);
	console.log('msg received on the websocket ' + message);
	backendSocket.write(message); //writing to ASE
	
	
  });

 // ws.on('close', function wsclose() {
//	console.log('disconnected');
//	backendSocket.end();
//  });
});

wss_2.on('connection', function connection(ws) {
  console.log("TUNNEL connecting to server");
  backendSocket = require('net').Socket();

  console.log("backendSocket = " + backendSocket.toString());

  backendSocket.connect({port : backendport}); //connected to ASE port
	
  function sendServerDataToClient(data)
  {
    console.log("TUNNEL backendSocket data event data.length = " + data.length + "\n");
	console.log("writing response data back on websocket " + data.length + "\n");
    ws.send(data, { binary: true});
  }
  
  backendSocket.on('data', sendServerDataToClient);
  //backendSocket.on('end', incomingSocket.end);
  //backendSocket.on('error', incomingSocket.end);
  
  ws.on('message', function incoming(message) {
    //console.log('received: %s', message);
	console.log('msg received on the websocket ' + message);
	backendSocket.write(message); //writing to ASE
	//incomingSocket.connect({port : incomingport});
	
  });

 // ws.on('close', function wsclose() {
//	console.log('disconnected');
//	backendSocket.end();
//  });
});
