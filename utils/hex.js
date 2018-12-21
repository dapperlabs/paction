const BN = require('bignumber.js');

// 'cc' -> '0xcc'
exports.hexToHex0x = (hex) => '0x' + hex;

// '0xcc' -> 'cc'
exports.hex0xToHex = (hex) => hex.slice(2);

// '204' -> 'cc'
exports.bnStringToHex = (str) => new BN(str).toString(16);

// '204' -> '0xcc'
exports.bnStringToHex0x = (str) =>
  exports.hexToHex0x(exports.bnStringToHex(str));

// 204 -> 'cc'
exports.numberToHex = (n) => {
  // https://stackoverflow.com/questions/57803/how-to-convert-decimal-to-hex-in-javascript
  const hex = n.toString(16);
  return hex.length % 2 ? '0' + hex : hex;
};

// 204 -> '0xcc'
exports.numberToHex0x = (n) => exports.hexToHex0x(exports.numberToHex(n));

// 'cc' -> <Buffer cc>
exports.hexToBuffer = (hex) => Buffer.from(hex, 'hex');

// '0xcc' -> <Buffer cc>
exports.hex0xToBuffer = (hex) => exports.hexToBuffer(exports.hex0xToHex(hex));

// <Buffer cc> -> 'cc'
exports.bufferToHex = (buf) => buf.toString('hex');

// <Buffer cc> -> '0xcc'
exports.bufferToHex0x = (buf) => exports.hexToHex0x(exports.bufferToHex(buf));

// '204' -> <Buffer cc>
exports.bnStringToBuffer = (str) =>
  exports.hexToBuffer(exports.bnStringToHex(str));
