const { numberToHex0x, bnStringToHex0x } = require('../utils/hex');

// address -> hex0x -> payload
exports.signTransaction = (from, unsignedTxHash) => {
  const payload = {
    jsonrpc: '2.0',
    method: 'eth_signTransaction',
    params: [from, unsignedTxHash],
    id: 1,
  };
  return JSON.stringify(payload);
};

// https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sendRawTransaction
// hex0x -> payload
exports.sendRawTransaction = (signedTx) => {
  const payload = {
    jsonrpc: '2.0',
    method: 'eth_sendRawTransaction',
    params: [signedTx],
    id: 1,
  };
  return JSON.stringify(payload);
};

// https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sendTransaction
// address -> RawTx -> payload
exports.sendTransaction = (from, rawTx) => {
  const payload = {
    jsonrpc: '2.0',
    method: 'eth_sendTransaction',
    params: [
      {
        from: from,
        gas: bnStringToHex0x(rawTx.gasLimit),
        gasPrice: bnStringToHex0x(rawTx.gasPrice),
        value: bnStringToHex0x(rawTx.value),
        data: rawTx.data || '',
      },
    ],
    id: 1,
  };
  if (rawTx.nonce >= 0) {
    payload.params[0].nonce = numberToHex0x(rawTx.nonce);
  }
  if (!!rawTx.to) {
    payload.params[0].to = rawTx.to;
  }
  return JSON.stringify(payload);
};

// https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_call
// address -> hex0x -> number? -> payload
exports.call = (deployedAddress, data, blockNumber) => {
  const payload = {
    jsonrpc: '2.0',
    method: 'eth_call',
    params: [
      {
        to: deployedAddress,
        data: data,
      },
      blockNumber ? numberToHex0x(blockNumber) : 'latest',
    ],
    id: 1,
  };
  return JSON.stringify(payload);
};
