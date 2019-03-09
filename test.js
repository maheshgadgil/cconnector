var http = require('http');
var fs = require('fs');
//var server = http.createServer(respond).listen(8080);

function processRequest(request, response){
	response.write('welcome');
	console.log('welcome');
	response.end();
}

var cfg = {
	ssl : true,
	port : 8080,
	ssl_key : 'newKey.pem',
	ssl_cert : 'cert.pem',
}

var httpServ = ( cfg.ssl ) ? require('https') : require('http');
var WebSocketServer   = require('ws').Server;

if (cfg.ssl) {
	app = httpServ.createServer( {
		key: fs.readFileSync( cfg.ssl_key),
		cert: fs.readFileSync( cfg.ssl_cert)
	}, processRequest).listen( cfg.port );
} else {
	app = httpServ.createServer( processRequest ).listen( cfg.port );
}

var wss = new WebSocketServer( { server: app } );

wss.on( 'connection', function ( wsConnect ) {  
 
         wsConnect.on( 'message', function ( message ) {  
              console.log( message );  
			  //echo back
			  wsConnect.send(message);
         }); 
 
 }); 
