const web3 = require('../utils/localweb3');

// path -> Contract
exports.contractFromABI = (abiJSON) => {
  const Contract = web3.eth.contract(abiJSON.abi);
  return Contract;
};

// path -> address -> ContractInstance
exports.instanceFromAddress = (abiJSON, deployedAddress) => {
  const Contract = exports.contractFromABI(abiJSON);
  const instance = Contract.at(deployedAddress);
  return instance;
};

// TODO: move to ???/data.js
// Contract -> [a] -> hex0x
exports.dataForConstractor = (abiJSON, params) => {
  const Contract = exports.contractFromABI(abiJSON);
  const data = Contract.new.getData.apply(
    Contract.new,
    params.concat([
      {
        data: abiJSON.bytecode,
      },
    ]),
  );
  return data;
};

// Can we use Contract?
// ContractInstance -> string -> [a] -> hex0x
exports.dataForInstanceMethod = (instance, methodName, params) => {
  const method = instance[methodName];
  const data = method.getData.apply(method, params);
  return data;
};
