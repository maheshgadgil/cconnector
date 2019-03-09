var m = new Map();

var Datastore = require('nedb')
  , db = new Datastore({ filename: 'datafile' });
db.loadDatabase(function (err) {    // Callback is optional
  // Now commands will be executed
  console.log('loaded');
  //throw err;
});
/*
db.find({}, function (err, docs) {
        docs.forEach(startListening);
});

function startListening(item,index) {
        net.createServer(tunnelSocketHandler).listen(item.port);

}
*/

var listenport1 = 8085; //listens for isql commands
var listenport2 = 8086; //listens for isql commands

var net = require('net');
var WebSocket = require('ws');
var counter = 0;
//var ws = new WebSocket('ws://localhost:8080');

var portArray = [8085, 8086];
var dataArray = ['data1', 'data2'];
var wsArray;


function tunnelSocketHandler(incomingSocket)
{
    console.log("TUNNEL connecting to server");
	
        var ws = new WebSocket('wss://10.162.65.241:9090/' + dataArray[counter], {
                rejectUnauthorized: false,
                origin: 'https://localhost:8080'
        });
        counter = counter + 1;
        ws.on('open', function() {
                console.log('connected');
				
//      });
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
  });
}



db.find({}, function (err, docs) {
        docs.forEach(startListening);
});

function startListening(item,index) {
		console.log(item.port);
        const server = net.createServer(tunnelSocketHandler);
		server.on('error', (err) => {
			throw err;
		});
		server.listen(item.port, () => {
			console.log('server bound');
			m.set(item.port, server);
		});
		console.log('after listening');
}

//test - to verify ws conn is terminated and server stops listening
//when an entry is removed from the datafile

db.remove({port:8085}, {}, function(err, numRemoved) {
		//m.get(8085).close();
});
