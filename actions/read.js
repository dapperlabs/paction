// -> Query
exports.readContract = (
  deployedAddress, // address
  method, // string
  params, // [a]
) => {
  return { deployedAddress, method, params };
};
