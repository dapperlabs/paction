const {
  dataForInstanceMethod,
  instanceFromAddress,
} = require('../ethereum/contract');

const makeQuery = (deployedAddress, method, params, data) => {
  return { deployedAddress, method, params, data };
};

// -> Query
exports.readContract = (
  abiJSON,
  deployedAddress, // address
  method, // string
  params, // [a]
) => {
  const instance = instanceFromAddress(abiJSON, deployedAddress);
  const data = dataForInstanceMethod(instance, method, params);
  return makeQuery(deployedAddress, method, params, data);
};
