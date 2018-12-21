const Tx = require('ethereumjs-tx');
const payload = require('../payload');
const { fromHex0x } = require('../../ethereum/signature');

// RawTx -> hex0x -> payload
exports.fromSignature = (rawTx, signature) => {
  // signature
  const { r, s, v } = fromHex0x(signature);
  return exports.fromRSV(rawTx, r, s, v);
};

// RawTx -> Buffer -> Buffer -> Buffer -> payload
exports.fromRSV = (rawTx, r, s, v) => {
  const txWithSignature = Object.assign({}, rawTx, { r, s, v });
  const tx = new Tx(txWithSignature);
  const signedTx = tx.serialize();
  return payload.sendRawTransaction(signedTx);
};
