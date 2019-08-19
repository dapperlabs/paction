const send = require('./send');
const assert = require('assert');

const WEB3_URL = process.env.WEB3_URL;
assert(!!WEB3_URL, 'missing env var WEB3_URL');

exports.sendPayload = (rpcPayload) => {
  return send.sendPayload(WEB3_URL, rpcPayload);
};
