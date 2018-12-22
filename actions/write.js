const { makeTxBase, makeRawTx } = require('../ethereum/transaction');
const {
  dataForConstractor,
  dataForInstanceMethod,
  instanceFromAddress,
} = require('../ethereum/contract');

// -> RawTx
exports.deployContract = (
  abiJSON, // ABI
  txBase, // txBase
  params, // [a]
) => {
  const data = dataForConstractor(abiJSON, params);
  const rawTx = makeRawTx(txBase, null, data);
  return rawTx;
};

// -> RawTx
exports.writeContract = (
  abiJSON, // ABI
  txBase, // txBase
  deployedAddress, // address
  method, // string
  params, // [a]
) => {
  const instance = instanceFromAddress(abiJSON, deployedAddress);
  const data = dataForInstanceMethod(instance, method, params);
  const rawTx = makeRawTx(txBase, deployedAddress, data);
  return rawTx;
};

// number? -> bnString -> bnString -> address -> RawTx
exports.transferEther = (nonce, value, gasPrice, to) => {
  const FixedGasLimit = 21000;
  // txBase
  const base = makeTxBase(nonce, gasPrice, FixedGasLimit, value);
  const rawTx = makeRawTx(base, to, null);
  return rawTx;
};
