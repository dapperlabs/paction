exports.showAllWrites = (abiJSON) => {
};

exports.showConstructor = (abiJSON) => {
  return abiJSON.abi.find((m) => m.type === 'constructor');
};
