const { deploy, methodCall, forSigning } = require('../rawTx');

const OffersABI = '../abis/Offers';

// instance -> txBase -> address -> address -> RawTx
exports.setCEO = (instance, txBase, deployedAddress, _newCEO) => {
  return methodCall(instance, txBase, deployedAddress, 'setCEO', [_newCEO]);
};

// instance -> txBase -> address -> address -> RawTx
exports.setCOO = (instance, txBase, deployedAddress, _newCOO) => {
  return methodCall(instance, txBase, deployedAddress, 'setCOO', [_newCOO]);
};

// instance -> txBase -> address -> address -> RawTx
exports.setCFO = (instance, txBase, deployedAddress, _newCFO) => {
  return methodCall(instance, txBase, deployedAddress, 'setCFO', [_newCFO]);
};

// instance -> txBase -> address -> address -> RawTx
exports.setLostAndFound = (
  instance,
  txBase,
  deployedAddress,
  _newLostAndFound,
) => {
  return methodCall(instance, txBase, deployedAddress, 'setLostAndFound', [
    _newLostAndFound,
  ]);
};

// instance -> txBase -> address -> RawTx
exports.withdrawTotalCFOEarnings = (instance, txBase, deployedAddress) => {
};

// instance -> txBase -> address -> RawTx
exports.withdrawTotalLostAndFoundBalance = (instance, txBase, deployedAddress) => {
};

// instance -> txBase -> address -> RawTx
exports.freeze = (instance, txBase, deployedAddress) => {
};
