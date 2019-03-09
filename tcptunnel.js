var listenport = 8085;
var backendport = 1600;
var net = require('net');
function tunnelSocketHandler(incomingSocket)
{
    console.log("TUNNEL connecting to server");

    var backendSocket = require('net').Socket();
    console.log("backendSocket = " + backendSocket.toString());

    backendSocket.connect({port : backendport});

    function sendServerDataToClient(data)
    {
        console.log("TUNNEL backendSocket data event data.length = " + data.length + "\n");
        incomingSocket.write(data);
    }
    backendSocket.on('data', sendServerDataToClient);
    backendSocket.on('end', incomingSocket.end);
    backendSocket.on('error', incomingSocket.end);


    function sendClientDataToServer(data)
    {
        console.log("data object type = " + Object.prototype.toString.call(data));
        console.log("TUNNEL incomingSocket data event data.length = " + data.length + "\n");
        backendSocket.write(data);
    }
    incomingSocket.on('data', sendClientDataToServer);
    incomingSocket.on('end', backendSocket.end);
}

function echoServer(incomingSocket)
{
    function echo(data)
	{
	    incomingSocket.write(data);
	}
	
	incomingSocket.on('data', echo);
}

//net.createServer(echoServer).listen(backendport);
net.createServer(tunnelSocketHandler).listen(listenport);
