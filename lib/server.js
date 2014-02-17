var http = require('http')

var nody = require('nody')


module.exports = function server( httpServer ) {
  var cons = nody.cons()
  var server

  if ( httpServer == null ) {
    httpServer = http.createServer()
  }

  httpServer.on( 'request', onRequest )
  httpServer.on( 'close', onClose )

  function onRequest( req, res ) {
    cons.pack( req, res )
    cons.submit()
  }

  function onClose(){
    console.log("on close")
    cons.end()
  }

  return cons
}