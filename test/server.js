var http = require('http')
var assert = require('assert')

var server = require('../lib/server')

var coreServer, needClose, cons

describe('server', function() {
  beforeEach(function(){
    coreServer = http.createServer()
    cons = server(coreServer)
    needClose = false
  })

  // afterEach(function (done) {
  //   if(coreServer && needClose)
  //     coreServer.close()
  // })

  it('should attach listeners', function() {
    assert.equal( 1, coreServer.listeners('request').length )
    assert.equal( 1, coreServer.listeners('close').length )
  })

  it('should pass request and response to cons', function(done) {
    cons.on('readable', function(){
      var passed = cons.read()
      assert( passed != null )
      assert( passed.payload[0] != null )
      assert( passed.payload[1] != null )
      passed.payload[1].end(passed.payload[0].url)
    })

    coreServer.listen( 3000,function(err){
      if(err) return done(err)
        http.get({port:'3000', path: "/hullahoop"}, function(res){
          res.on('readable',function(){
            assert.equal('/hullahoop', res.read())
            coreServer.close()
            done()
          })
        })
    })
  })

  it('should close', function(done) {
    cons.on('finish', function(){
      done()
    })
    coreServer.listen(3000, function( err ){
      if (!err)
        coreServer.close()
    })
  })
})
