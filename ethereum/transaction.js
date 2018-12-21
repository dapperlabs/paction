const Tx = require('ethereumjs-tx');
const { bufferToHex0x } = require('../utils/hex');

// number -> bnString -> bnString -> number? -> txBase
exports.makeTxBase = (nonce, gasPrice, gasLimit, value) => {
  return {
    nonce,
    gasPrice,
    gasLimit,
    value,
  };
};

// -> RawTx
exports.makeRawTx = (
  txBase, // txBase
  to, // address?
  data, // hex0x?
) => {
  const rawTx = {
    nonce: txBase.nonce,
    gasPrice: txBase.gasPrice,
    gasLimit: txBase.gasLimit,
    to: to,
    value: txBase.value,
    data: data,
  };
  return rawTx;
};

// RawTx -> unsignedTxHash
exports.forSigning = (rawTx) => {
  const tx = new Tx(rawTx);
  const includeSignature = false;
  // buffer
  const txHash = tx.hash(includeSignature);
  // hex0x
  const rawTxHash = bufferToHex0x(txHash);
  return rawTxHash;
};
