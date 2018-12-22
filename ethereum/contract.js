const web3 = require('../utils/localweb3');

// abiJSON -> Contract
exports.contractFromABI = (abiJSON) => {
  const Contract = web3.eth.contract(abiJSON.abi);
  return Contract;
};

// abiJSON -> address -> ContractInstance
exports.instanceFromAddress = (abiJSON, deployedAddress) => {
  const Contract = exports.contractFromABI(abiJSON);
  const instance = Contract.at(deployedAddress);
  return instance;
};

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

// ContractInstance -> string -> [a] -> hex0x
exports.dataForInstanceMethod = (instance, methodName, params) => {
  // const data = instance.setUnsuccessfulFee.getData('4000000000000000');
  // console.log(methodName, data);
  const method = instance[methodName];
  // const method = instance.setMinimumTotalValue;
  const data = method.getData.apply(method, params);
  return data;
};
