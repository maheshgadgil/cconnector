var WebSocketServer = require('ws').Server;
var fs = require('fs');
var listenPort = 30015;
var net = require('net');
//var backendSocket = require('net').Socket();

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
var wss = new WebSocketServer({
    server: server
});


wss.on('connection', function connection(ws) {
  console.log("incoming ws connection detected");
  //start listening on the isql port

  net.createServer(tunnelSocketHandler).listen(listenPort);
  
  //backendSocket.connect({port: listenPort});

	function tunnelSocketHandler(incomingSocket) {
	    console.log("new connection from client");
		incomingSocket.on('data', function sendClientDataToServer(data) {
		
			ws.send(data, { binary: true});
			
		});
		ws.on('message', function(data, flags) {
			console.log('msg received on the websocket ' );
			incomingSocket.write(data);
		});
	}


	

	

  //backendSocket.on('end', incomingSocket.end);
  //backendSocket.on('error', incomingSocket.end);
  


 // ws.on('close', function wsclose() {
//	console.log('disconnected');
//	backendSocket.end();
//  });
});

