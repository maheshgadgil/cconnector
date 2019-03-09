var Http = require('http');
 
var req = Http.request({
    host: 'proxy',
    // proxy IP
    port: 8080,
    // proxy port
    method: 'GET',
    path: 'http://cnn.com/' // full URL as path
}, function (res) {
    res.on('data', function (data) {
        console.log(data.toString());
    });
});
 
req.end();