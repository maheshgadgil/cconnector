var WebSocketServer = require('ws').Server;
var fs = require('fs');
var listenPort = 30015;
var net = require('net');
var tcpServer = net.Server;
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

var wss = new WebSocketServer({
    server: server
});

var wsArray = [];

wss.on('connection', function connection(ws) {
	wsArray.push(ws);
});

net.createServer(setupPipes).listen(8085);

function setupPipes(tcpConnection){
	var ws = wsArray.pop();
	ws.on('message', function(data, flags) {
		tcpConnection.write(data);
	});
	
	tcpConnection.on('data', function(data) {
		 ws.send(data, { binary: true});
	});
}


