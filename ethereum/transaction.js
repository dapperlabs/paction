const Tx = require('ethereumjs-tx');
const { bufferToHex0x, bnStringToHex0x, numberToHex0x } = require('../utils/hex');

// RawTx -> signature? -> EthTx
exports.toEthTx = (rawTx, signature) => {
  const tx = {
    gas: bnStringToHex0x(rawTx.gasLimit),
    gasPrice: bnStringToHex0x(rawTx.gasPrice),
    value: bnStringToHex0x(rawTx.value),
    data: rawTx.data || '',
  };
  if (rawTx.nonce >= 0) {
    tx.nonce = numberToHex0x(rawTx.nonce);
  }
  if (rawTx.to) {
    tx.to = rawTx.to;
  }
  if (signature) {
    Object.assign(tx, signature);
  }
  return new Tx(tx);
};

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

// RawTx -> Hex0x
exports.toRLP = (rawTx) => {
  const ethTx = exports.toEthTx(rawTx);
  const buf = ethTx.serialize();
  return bufferToHex0x(buf);
};

// RawTx -> unsignedTxHash
exports.forSigning = (rawTx) => {
  const tx = exports.toEthTx(rawTx);
  const includeSignature = false;
  // buffer
  const txHash = tx.hash(includeSignature);
  // hex0x
  const rawTxHash = bufferToHex0x(txHash);
  return rawTxHash;
};

// RawTx -> number -> RawTx
exports.updateNonce = (rawTx, nonce) => {
  return Object.assign({}, rawTx, { nonce });
};
