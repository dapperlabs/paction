const { bufferToHex0x } = require('../utils/hex');
const { privateToAddress } = require('ethereumjs-util');

// hex0x -> hex0x
exports.privateKeyToAddress = (privateKey) => {
  return bufferToHex0x(privateToAddress(privateKey));
};

