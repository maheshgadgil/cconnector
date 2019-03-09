var WebSocketClient = require('websocket').client;
var fs = require('fs');
var client = new WebSocketClient({
tlsOptions: {ca: [ fs.readFileSync('/home/I828591/node_code/server.crt') ]
, rejectUnauthorized: false}});
var tunnel = require('tunnel');

var tunnelingAgent = tunnel.httpsOverHttp({
  proxy: {
    host: 'bos50-pxy-01-r1-us.net.sap.corp',
    port: 8080,
  }
});

var requestOptions = {

    rejectUnauthorized: false,
    strictSSL: false,
    requestCert: false,
};

var headers = {
    rejectUnauthorized: false,
    strictSSL: false,
    requestCert: false
};
client.connect('wss://52.174.150.206:443',null, '52.174.150.206', headers, requestOptions);
client.on('connect', function() {console.log('connected')});
client.on('connectFailed', function(desc) {console.log('error' + desc)});
