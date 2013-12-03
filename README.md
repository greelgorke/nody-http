# nody-http: the http streams for nody

## Install

```
npm install nody-http --save
```

`nody-http` has `nody as peerDependency, so be sure to install it too

## Usage

```javascript
var nhtpp = require('nody-http')
var http = require(http)

//create server
var httpServer = http.createServer()
nhttp.server( httpServer )
  .pipe( anotherNodyStream )

httpServer.listen()
```