var wts = require("node-reverse-wstunnel");

reverse_client = new wts.client_reverse();
//portTunnel is the port that will be opened on the websocket server 
//remotehost:port is the service that will be reverse tunneled
reverse_client.start(8085, 'ws://10.97.167.220:9090', '127.0.0.1:1600');