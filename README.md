ninjoxy
=======

Node.js Content-Injecting HTTP Proxy

Just for a bit of fun and a bit of an excuse to learn node, this is the "Node.js INJecting prOXY"

It will (eventually) simply take the requests you feed it and pass them on to the destination server, quietly adding the content you provide for the URL being requested before it returns the response to the client.

At the moment (2013-08-21) this does _nothing_ other than pass the request through and even that isn't fully tested yet but expect rapid updates.

MIT-licensed - do what you want with it, just don't blame me. :)

TODO
====
- Confirm actually proxying requests is working
- Look at allowing custom DNS servers (in case box this is on is using same DHCP as client)
- Allow regex matching for URLs
- Allow content injection
- Allow content loading from files
