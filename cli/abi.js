// [input] -> string
const formatInputs = (inputs) => {
  return inputs.map((i) => {
    return `${i.type} ${i.name}`;
  }).join(', ');
};

const isWrite = (m) => {
  return m.type === 'function' && m.stateMutability !== 'view';
};

// abiJSON -> [string]
exports.showAllWrites = (abiJSON) => {
  const methods = abiJSON.abi;
  const writes = methods.filter(isWrite);
  return writes.map((m) => {
    return `${m.name}(${formatInputs(m.inputs)})`;
  }).join('\n');
};

// abiJSON -> method?
exports.showConstructor = (abiJSON) => {
  return abiJSON.abi.find((m) => m.type === 'constructor');
};

// abiJSON -> string -> method?
exports.findMethod = (abiJSON, methodName) => {
  return abiJSON.abi.filter((method) => {
    return method.name === methodName;
  })[0];
};

// Note: assuming there is at least one write method
// abiJSON -> string
exports.firstWriteName = (abiJSON) => {
  return abiJSON.abi.find(isWrite).name;
};
