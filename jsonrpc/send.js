const sendRawTransaction = require('./payload');
const http = require('./http');

// url -> SignedTx -> Promise ()
exports.sendSignedTransaction = (provider, signedTx) => {
  const rpcPayload = sendRawTransaction(signedTx);
  return exports.sendPayload(provider, rpcPayload);
};

// url -> Payload -> Promise ()
exports.sendPayload = async (provider, rpcPayload) => {
  const resp = await http.post(provider, rpcPayload)
  if (!resp) {
    throw new Error('empty response');
  }
  if (resp.data && resp.data.error) {
    throw new Error(JSON.stringify(resp.data.error));
  }
  return resp.data.result;
};
