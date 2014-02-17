# nody-http: the http streams for nody

## Install

```
npm install nody-http --save
```

`nody-http` has `nody as peerDependency, so be sure to install it too

## Usage

```javascript
var nhttp = require('nody-http')

```
### Server

```javascript
var http = require(http)

//create server
var httpServer = http.createServer()

nhttp.server( httpServer )
  .pipe( anotherNodyStream )

httpServer.listen()
```

### Router

```javascript
var router = nhttp.router()

nhttp.server( httpServer )
  .pipe( router )

  router.route('/allMethods', otherStream)
  router.route('GET /aGetPath/:withParams', getStream)
  router.route(matchingFunction, getStream)
````

The router works quite like the nody.cond stream, only it accepts strings, regular expressions and functions as first parameter and transforms them into a matcher function. `.route()`, which you should use instead of pipe, returns the provided target stream, so you can chain further processing right here.

Unlike a cond stream the router will respond to the client with HTTP code 404. To prevent or customize this behaviour, you can call `.route()` method with only a stream. This will be used as a catch all route.

### Connect

**//TODO: Experimental**
nody-http is compatible with almost every Connect middleware by default. Just pass a middleware function to a nody.node as processor:

```javascript
var staticAssets = require('connect-static')

nhttp.pipe( nody.node( staticAssets() ) )

```
## License
MIT