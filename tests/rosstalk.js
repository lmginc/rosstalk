'use strict';

var Rosstalk = require('..');

var net = require('net');
var assert = require('assert');
var sinon = require('sinon');

describe('Rosstalk', function(){

  var write;

  before(function(){
    sinon.stub(net, 'connect');

    write = sinon.spy()

    net.connect.returns({
      write: write
    });
  });

  after(function(){
    net.connect.restore();
  });

  describe('creating a new Rosstalk connection', function(){
    var rosstalk;

    it('creates a connection to a stubbed server', function(){
      
      rosstalk = new Rosstalk({
        host: '127.0.0.1'
      });

      rosstalk.connect();

      assert(net.connect.called);
    });

    it('should send commands to the tcp socket for transitioning MLE1 with an auto trans', function(){
      
      rosstalk.trans(1, true);

      var buff = write.lastCall.args;

      assert.equal('MEAUTO 1\r\n', buff.toString());
    });

    it('should send commands to the tcp socket for transitioning MLE2 with a cut', function(){
      
      rosstalk.trans(2);

      var buff = write.lastCall.args;

      assert.equal('MECUT 2\r\n', buff.toString());
    });

    it('should send commands to the tcp socket for firing a custom control, 101', function(){
    
      // bank 1 cc 01
      rosstalk.cc(1, 1);

      var buff = write.lastCall.args;

      assert.equal('CC 101\r\n', buff.toString());
    });

    it('should send commands to the tcp socket for firing a custom control, 120', function(){
    
      // bank 1 cc 20
      rosstalk.cc(1, 20);

      var buff = write.lastCall.args;

      assert.equal('CC 120\r\n', buff.toString());
    });

    it('should send commands to the tcp socket for fading to black', function(){
    
      rosstalk.ftb();

      var buff = write.lastCall.args;

      assert.equal('FTB\r\n', buff.toString());
    });

    it('should send commands to the tcp socket for transing a key me1 key1 auto', function(){
    
      rosstalk.transKey(1, 1, true);

      var buff = write.lastCall.args;

      assert.equal('KEYAUTO 1:1\r\n', buff.toString());
    });

    it('should send commands to the tcp socket for transing a key me2 key4 cut', function(){
    
      rosstalk.transKey(2, 4);

      var buff = write.lastCall.args;

      assert.equal('KEYCUT 2:4\r\n', buff.toString());
    });

  });
});
