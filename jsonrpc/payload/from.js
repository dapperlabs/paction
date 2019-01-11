const payload = require('../payload');
const { toEthTx } = require('../../ethereum/transaction');
const { bufferToHex0x } = require('../../utils/hex');

// RawTx -> signature -> payload
exports.fromSignature = (rawTx, signature) => {
  const ethTx = toEthTx(rawTx, signature);
  const buf = ethTx.serialize();
  const signedTx = bufferToHex0x(buf);
  return payload.sendRawTransaction(signedTx);
};
