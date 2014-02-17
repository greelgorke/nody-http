var util = require('util')
var url = require('url')
var routes = require( 'routes' )


var nody = require('nody')

var cond = nody.cond
var sink = nody.sink
var noop = function(){}

module.exports = function function_name () {
  return new Router()
}

function Router(){
  if( ! ( this instanceof Router ) ) return new Router()
  this.matcher = routes()
  this.cond = cond()
  this.sink = sink(sinkHandler)
  this.cond.pipe( this.sink )
}

Router.prototype.route = function(pattern, handlerStream) {
  var matcher

  switch( arguments.length ) {
    case 0:
      throw new Error("Please provide a handler handlerStream")
    case 1:
      handlerStream = pattern
      pattern = null
      break;
    default:
  }

  if ( handlerStream._writeableState == null )
    throw new TypeError("handlerStream should be a Writable")


  if (pattern){
    matcher = createMatcherFunction(this, pattern)
    if ( matcher ) {
      return this.cond.pipe( matcher, handlerStream )
    }
    throw new Error("Cannot create matcher function from provided pattern argument")
  } else {
    this.cond.unpipe( this.sink )
    return this.cond.pipe( handlerStream )
  }
}

function sinkHandler(req, res){
  var message = "Cannot handle " + req.url
  res.writeHead( 404, message )
  res.end( message )
}

function createMatcherFunction (self, pattern) {
  function matcherFN(req, res, cb){
    var path = req.method + ' '+ req.url
    cb(self.matcher.match(path) != null)
  }

  self.matcher.addRoute(pattern, noop)
  return matcherFN
}
