var http = require('http')

var LISTEN_IP = '0.0.0.0';
var LISTEN_PORT = 80;

var patterns = [
  {
    'name': 'javascript',
    'pattern': /\.(js)$/i,
    'injection': "console.log('Hooray!');"
  },
  {
    'name': 'css',
    'pattern': /\.(css)$/i,
    'injection': "a { opacity: 0.33 !important; }"
  }
]

http.createServer(function(req, res) {
  if ('accept-encoding' in req.headers) {
    delete req.headers['accept-encoding'];
  }
	
  var options = {
    hostname: req.headers.host,
    port: LISTEN_PORT,
    path: req.url,
    headers: req.headers
  }

  res.injected = null;

  patterns.forEach(function(p){
    if (p.pattern.test(req.url)) {
      res.injected = p.injection;
    }
  });

  var p_req = http.request(options, function(p_res) {
    res.writeHead(p_res.statusCode, p_res.headers);
    p_res.on('data', function(chunk) {
      res.write(chunk);
    }).on('end', function() {
      if (res.injected !== null) {
        res.write(res.injected, "utf8");
      }
      res.end();
    });
  }).on('error', function(e) {
    console.log('Request Error: ' + e.message);
    res.end('Request Error');
  }).end();

}).listen(LISTEN_PORT, LISTEN_IP);

console.log('Server running at http://' + LISTEN_IP + ':' + LISTEN_PORT + '/');

