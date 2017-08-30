var http = require('http');
var settings = require('./settings');
var server = http.createServer();
console.log(settings);

var msg = '';
server.on('request', function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    switch (req.url) {
        case '/':
            msg = 'hello world';
            break;
        case '/about':
            msg = 'about me';
            break;
        case '/contact_as':
            msg = 'contact as';
            break;
    }
    res.write(msg);
    res.end();
});
server.listen(settings.port, settings.host);
console.log('server listening...');
