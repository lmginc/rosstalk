# rosstalk

A RossTalk implementation in node.js

### Installation

```bash
$ npm install rosstalk
```

### Usage

```javascript
var Rosstalk = require('rosstalk');

var switcher = new Rosstalk({
  host: '192.168.0.3' // switcher ip address
});


/**
 *  Fade to black
 */

switcher.ftb();


/**
 *  fire a custom control, bank 1 cc 3
 *
 *  @param {Number} bank - the cc bank
 *  @param {Number} cc - the cc number in that bank
 */

swithcer.cc(1, 3);


/**
 *  transition mle 1 with auto trans
 *
 *  @param {Number} MLE - the MLE to trans on
 *  @param {Boolean} autoTrans - if true will auto trans
 */

switcher.trans(1, true);


/**
 *  transition mle 2 with a cut
 *
 *  @param {Number} MLE - the MLE to trans on
 *  @param {Boolean} autoTrans - if true will auto trans
 */

switcher.trans(2);


/**
 *  transition key 3 on me 1 with auto trans
 *
 *  @param {Number} MLE - the MLE the keyer belongs to
 *  @param {Number} KEY - the keyer to trans
 *  @param {Boolean} autoTrans - if true will auto trans
 */

switcher.transKey(1, 3, true);

/**
 *  transition key 2 on me 2 with a cut
 *
 *  @param {Number} MLE - the MLE the keyer belongs to
 *  @param {Number} KEY - the keyer to trans
 *  @param {Boolean} autoTrans - if true will auto trans
 */

switcher.transKey(2, 2);
```
