const {
  hexToHex0x,
  hex0xToHex,
  bnStringToHex,
  bnStringToHex0x,
  numberToHex,
  numberToHex0x,
  hexToBuffer,
  hex0xToBuffer,
  bufferToHex,
  bufferToHex0x,
} = require('./hex');

const assert = require('assert');

assert.equal(hexToHex0x('cc'), '0xcc');
assert.equal(hex0xToHex('0xcc'), 'cc');
assert.equal(bnStringToHex('204'), 'cc');
assert.equal(bnStringToHex0x('204'), '0xcc');
assert.equal(numberToHex(204), 'cc');
assert.equal(numberToHex0x(204), '0xcc');
assert.deepEqual(hexToBuffer('cc'), Buffer.from('cc', 'hex'));
assert.deepEqual(hex0xToBuffer('0xcc'), Buffer.from('cc', 'hex'));
assert.equal(bufferToHex(Buffer.from('cc', 'hex')), 'cc');
assert.equal(bufferToHex0x(Buffer.from('cc', 'hex')), '0xcc');
