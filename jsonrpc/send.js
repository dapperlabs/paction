const sendRawTransaction = require('./jsonrpc');
const http = require('./http');

// url -> SignedTx -> Promise ()
exports.sendSignedTransaction = (provider, signedTx) => {
  const rpcPayload = sendRawTransaction(signedTx);
  return http.post(provider, rpcPayload);
};
