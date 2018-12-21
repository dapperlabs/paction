const { makeTxBase, makeRawTx } = require('../ethereum/transaction');
const {
  dataForConstractor,
  dataFromInstanceMethod,
} = require('../ethereum/contract');

// -> RawTx
exports.deployContract = (
  abiJSON, // ABI
  txBase, // txBase
  params, // [a]
) => {
  const data = dataForConstractor(abiJSON, params);
  const rawTx = makeRawTx(txBase, null, data);
  console.log({ rawTx });
  return rawTx;
};

// -> RawTx
exports.writeContract = (
  instance, // instance
  txBase, // txBase
  deployedAddress, // address
  method, // string
  params, // [a]
) => {
  const data = dataFromInstanceMethod(instance, method, params);
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
