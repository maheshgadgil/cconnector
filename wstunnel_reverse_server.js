var wts = require("node-reverse-wstunnel");

reverse_server = new wts.server_reverse(); 
//the port of the websocket server 
reverse_server.start(9090);