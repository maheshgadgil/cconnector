var wts = require("node-reverse-wstunnel");
 
client = new wts.client();
//localport is the opened port of the localhost for the tunnel
//remotehost:port is the service that will be tunneled
client.start(8085,'ws://localhost:9090', '127.0.0.1:1600');