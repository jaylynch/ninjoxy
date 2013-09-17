var http = require('http')

var LISTEN_IP = '0.0.0.0';
var LISTEN_PORT = 80;

http.createServer(function(req, res) { 
  console.log(req.headers); 
  console.log('\n');
  if ('accept-encoding' in req.headers) {
    delete req.headers['accept-encoding'];
  }
  
  var options = {
    hostname: req.headers.host,
    port: LISTEN_PORT,
    path: req.url,
    headers: req.headers
  }

  var p_req = http.request(options, function(p_res) {
    res.writeHead(p_res.statusCode, p_res.headers);
    p_res.on('data', function(chunk) {
      res.write(chunk);
    }).on('end', function() {
      res.end();
    });
  }).on('error', function(e) {
    console.log('Request Error: ' + e.message);
    res.end('Request Error');
  }).end();
}).listen(LISTEN_PORT, LISTEN_IP);

console.log('Server running at http://' + LISTEN_IP + ':' + LISTEN_PORT + '/');

