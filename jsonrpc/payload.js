const { numberToHex0x, bnStringToHex0x } = require('../utils/hex');

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

// address -> RawTx -> [param]
const sendArgs = (from, rawTx) => {
  const params = [
    {
      from: from,
      gas: bnStringToHex0x(rawTx.gasLimit),
      gasPrice: bnStringToHex0x(rawTx.gasPrice),
      value: bnStringToHex0x(rawTx.value),
      data: rawTx.data || '',
    },
  ];
  if (rawTx.nonce >= 0) {
    params[0].nonce = numberToHex0x(rawTx.nonce);
  }
  if (rawTx.to) {
    params[0].to = rawTx.to;
  }
  return params;
};

// address -> RawTx -> payload
exports.signTransaction = (from, rawTx) => {
  const params = sendArgs(from, rawTx);
  const payload = {
    jsonrpc: '2.0',
    method: 'eth_signTransaction',
    params: params,
    id: 1,
  };
  return JSON.stringify(payload);
};

// https://github.com/ethereum/wiki/wiki/JSON-RPC#eth_sendTransaction
// address -> RawTx -> payload
exports.sendTransaction = (from, rawTx) => {
  const params = sendArgs(from, rawTx);
  const payload = {
    jsonrpc: '2.0',
    method: 'eth_sendTransaction',
    params: params,
    id: 1,
  };
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

// address -> query -> payload
// TODO: support blockNumber
exports.callWithQuery = (query) => {
  return exports.call(query.deployedAddress, query.data);
};

// get nonce
// address -> blockNumber? -> payload
exports.getTransactionCount = (address, blockNumber) => {
  const payload = {
    jsonrpc: '2.0',
    method: 'eth_getTransactionCount',
    params: [
      address,
      blockNumber ? numberToHex0x(blockNumber) : 'latest',
    ],
    id: 1,
  };
  return JSON.stringify(payload);
};
