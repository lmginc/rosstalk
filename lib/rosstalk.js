'use strict';

var net = require('net');
var util = require('util');
var events = require('events');

const cr = '\r\n';

/**
 *  Expose `Rosstalk`
 */

module.exports = Rosstalk;

/**
 *  A talkable ross
 *
 *  @params {Object} opts
 */

function Rosstalk(opts) {
  opts = opts || {};

  if (!opts.host) throw new Error('Must provide switcher host address');

  this.host = opts.host;
  this.port = opts.port || 7788;

  this.connection = null;
};

/**
 *  Inherit the EE
 */

util.inherits(Rosstalk, events.EventEmitter);

/**
 *  Connect to the switcher
 */

Rosstalk.prototype.connect = function connect() {

  this.connection = net.connect(this.port, this.host);

  return this;
};

/**
 *  Send a command to the switcher
 */

Rosstalk.prototype._send = function _send(command) {

  var buf = new Buffer(command + cr);

  this.connection.write(buf);

  return this;
};

/**
 *  Transition an me
 *
 *  @param {Number} me - the me number
 *  @param {Boolean} auto - whether or not to auto trans
 */

Rosstalk.prototype.trans = function trans(me, auto) {
  me = me || 1;

  var cmd = auto ? 'MEAUTO' : 'MECUT';

  this._send(cmd + ' ' + me);
};

/**
 *  Fire a custom control
 *
 *  @param {Number} bank - the cc bank number
 *  @param {Number} num - the cc in the bank to fire
 */

Rosstalk.prototype.cc = function cc(bank, num) {
  if (num < 10) num = '0' + num.toString();

  var cmd = 'CC ' + bank+num;

  this._send(cmd);
};

/**
 *  Fade to black
 */

Rosstalk.prototype.ftb = function ftb() {
  var cmd = 'FTB';

  this._send(cmd);
};

/**
 *  Trans a keyer
 *
 *  @param {Number} me - the me number
 *  @param {Number} key - the keyer on the me
 *  @param {Boolean} auto - auto trans for keyer
 */

Rosstalk.prototype.transKey = function transKey(me, key, auto) {
  var cmd = auto ? 'KEYAUTO' : 'KEYCUT';

  cmd += ' ' + me + ':' + key;

  this._send(cmd);
};
