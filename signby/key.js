const Tx = require('ethereumjs-tx');
const {
  bufferToHex0x,
  hex0xToBuffer,
  bnStringToHex0x,
  numberToHex0x,
  bnStringToBuffer,
} = require('../utils/hex');

// RawTx -> hex0x -> hex0x
exports.signWithPrivateKey = (rawTx, privateKey) => {
  const rawTx0x = {
    nonce: numberToHex0x(rawTx.nonce),
    gasPrice: bnStringToHex0x(rawTx.gasPrice),
    gasLimit: bnStringToHex0x(rawTx.gasLimit),
    to: rawTx.to,
    value: bnStringToHex0x(rawTx.value),
    data: rawTx.data || '',
  };
  console.log(rawTx0x);
  // https://github.com/ethereumjs/ethereumjs-tx/blob/master/index.js#L13
  const tx = new Tx(rawTx0x);
  console.log(privateKey);
  const key = hex0xToBuffer(privateKey);
  tx.sign(key);
  const buf = tx.serialize();
  const signedTx = bufferToHex0x(buf);
  return signedTx;
};
