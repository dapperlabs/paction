const signByKey = require('./signby/key');
const writeActions = require('./actions/write');
const readActions = require('./actions/read');
const { makeTxBase } = require('./ethereum/transaction');
const Signature = require('./ethereum/signature');
const inputs = require('./cli/inputs');
const outputs = require('./cli/outputs');
const { askUntilValid } = require('./cli/ask');
const hardware = require('./signby/hardware');
const { fromSignature } = require('./jsonrpc/payload/from');
const Payload = require('./jsonrpc/payload');
const {
  showAllWrites,
  showAllReads,
  showConstructor,
  findMethod,
  findMethodBySignature,
  firstWriteName,
  firstReadName,
  decodeParameters
} = require('./cli/abi');
const { sequential } = require('./utils/async');
const FunctionParam = require('./types/param');

exports.entry = async ask => {
  const action = await askUntilValid(ask,
    inputs.chooseOneOf('actions', [
      'Transfer Ether',
      'Deploy a contract',
      'Make a method call to a deployed contract',
      'Read a contract',
      'Query the current nonce for an account',
      'Decode transaction data',
    ])
  );
  if (false) {
  } else if (action === 1) {
    return exports.transferEther(ask);
  } else if (action === 2) {
    return exports.deployContract(ask);
  } else if (action === 3) {
    return exports.writeContract(ask);
  } else if (action === 4) {
    return exports.readContract(ask);
  } else if (action === 5) {
    return exports.queryNonce(ask);
  } else if (action === 6) {
    return exports.decodeTransactionData(ask);
  }
};

exports.transferEther = async ask => {
  const to = await askUntilValid(ask,
    inputs.address(
      'Please type the address of the your receiptian, i.e. (0xFF0E3299e55EFD859176D582FC805481e8344915): '
    )
  );
  const txBase = await exports.askTxBase(ask, false);
  const rawTx = writeActions.transferEther(txBase.nonce, txBase.value, txBase.gasPrice, to);
  return exports.chooseHowToSign(ask, rawTx);
};

exports.askTxBase = async (ask, needAskLimit) => {
  const value = await askUntilValid(ask,
    inputs.bignumber(
      'Please type the Ether value you would like to send in wei:\nExample: (10000000000) for 10 gwei'
    )
  );
  const nonce = await askUntilValid(ask,
    inputs.nonce('Please type the nonce, i.e. (30):'));
  const gasPrice = await askUntilValid(ask,
    inputs.bignumber('Please type the gas price in wei:\nExample: (10000000000) for 10 gwei')
  );
  let gasLimit = null;
  if (needAskLimit) {
    gasLimit = await askUntilValid(ask,
      inputs.bignumber('Please type the gas limit in wei:\nExample: (10) for 10 gas')
    );
  }
  const txBase = makeTxBase(nonce, gasPrice, gasLimit, value);
  return txBase;
};

const askFunctionParam = ask => {
  return param => {
    const { question, validator } = FunctionParam.toInputs(param);
    return askUntilValid(ask, { question, validator });
  };
};

const askFunctionParams = async (ask, func) => {
  // for contract that has no constructor, the func might be empty,
  // in which case, we want to return empty array as params
  if (!func) {
    return [];
  }
  const inputs = func.inputs;
  // [string]
  const all = await sequential(askFunctionParam(ask), inputs);
  return all;
};

exports.deployContract = async ask => {
  const abiJSON = await askUntilValid(ask, inputs.abiPath(
    'Please type the path to the abi json file, i.e. (./abis/Offers.json):'
  ));
  // TODO: it's vulnerable to load a json file with any path, better to add some check
  // but for simplicity, I'm allowing it for now.
  const constructor = showConstructor(abiJSON);
  console.log('Parsed contract constructor:');
  console.log(constructor);
  const params = await askFunctionParams(ask, constructor);
  let value = '0';
  if (constructor && constructor.payable) {
    value = await askUntilValid(ask, inputs.bignumber(
      'Please type the Ether value you would like to send to the contract constructor in wei:\nExample: (10000000000) for 10 gwei'
    ));
  }
  const nonce = await askUntilValid(ask, inputs.nonce('Please type the nonce, i.e. (30):'));
  const gasPrice = await askUntilValid(ask, inputs.bignumber(
    'Please type the gas price in wei:\nExample: (10000000000) for 10 gwei'
  ));
  const gasLimit = await askUntilValid(ask, inputs.bignumber(
    'Please type the gas limit in wei:\nExample: (10) for 10 gas'
  ));
  const txBase = makeTxBase(nonce, gasPrice, gasLimit, value);
  const rawTx = writeActions.deployContract(abiJSON, txBase, params);
  return exports.chooseHowToSign(ask, rawTx);
};

exports.writeContract = async ask => {
  const abiJSON = await askUntilValid(ask, inputs.abiPath(
    'Please type the path to the abi json file, i.e. (./abis/Offers.json):'
  ));
  const { method, params, payable } = await exports.askContractorWriteMethodCall(ask, abiJSON);
  const contractAddress = await askUntilValid(ask, inputs.address(
    'contractAddress (0x57831a0c76ba6b4fdcbadd6cb48cb26e8fc15e93): '
  ));
  let value = '0';
  if (payable) {
    value = await askUntilValid(ask, inputs.bignumber(
      'Please type the Ether value you would like to send to the method in wei:\nExample: (10000000000) for 10 gwei'
    ));
  }
  const nonce = await askUntilValid(ask, inputs.nonce('Please type the nonce, i.e. (30):'));
  const gasPrice = await askUntilValid(ask, inputs.bignumber(
    'Please type the gas price in wei:\nExample: (10000000000) for 10 gwei'
  ));
  const gasLimit = await askUntilValid(ask, inputs.bignumber(
    'Please type the gas limit in wei:\nExample: (10) for 10 gas'
  ));
  const txBase = makeTxBase(nonce, gasPrice, gasLimit, value);
  const rawTx = writeActions.writeContract(
    abiJSON,
    txBase,
    contractAddress,
    method,
    params
  );
  return exports.chooseHowToSign(ask, rawTx);
};

exports.askContractorWriteMethodCall = async (ask, abiJSON) => {
  const allMethods = showAllWrites(abiJSON).join('\n');
  console.log(allMethods);
  const example = firstWriteName(abiJSON);
  const methodName = await ask(
    `Please type the method name:\nExample: (${example})`
  );
  const method2 = findMethod(abiJSON, methodName);
  const method = method2;
  if (!method) {
    return Promise.reject(new Error(`unknown method name: ${method}`));
  }
  const params = await askFunctionParams(ask, method);
  return {
    method: method.name,
    params: params,
    payable: method.payable,
  };
};

exports.askContractorReadMethodCall = async (ask, abiJSON) => {
  const allMethods = showAllReads(abiJSON).join('\n');
  console.log(allMethods);
  const example = firstReadName(abiJSON);
  const methodName = await ask(
    `Please type the method name:\nExample: (${example})`
  );
  const method2 = findMethod(abiJSON, methodName);
  const method = method2;
  if (!method) {
    return Promise.reject(new Error(`unknown method name: ${method}`));
  }
  const params = await askFunctionParams(ask, method);
  return {
    method: method.name,
    params: params,
  };
};

exports.chooseHowToSign = async (ask, rawTx) => {
  const choice = await askUntilValid(ask,
    inputs.chooseOneOf('ways to sign', [
      'send to the geth node to sign and send',
      'send to the geth node and get back raw transaction with the signature',
      'generates payload for dapper signing service to sign and send',
      'Provide private key to sign',
      'show transaction data',
    ])
  );

  if (false) {
  } else if (choice === 1) {
    return exports.signByGethAndSend(ask, rawTx);
  } else if (choice === 2) {
    return exports.signByGeth(ask, rawTx);
  } else if (choice === 3) {
    console.log(rawTx);
    // return exports.signByDapperService(ask, rawTx);
  } else if (choice === 4) {
    return exports.signWithPrivateKey(ask, rawTx);
  } else if (choice === 5) {
    return exports.showTransactionData(ask, rawTx);
  }
};

exports.signByGethAndSend = async (ask, rawTx) => {
  const from = await askUntilValid(ask, inputs.address('Please provide the account to sign the transaction'));
  const payload = Payload.sendTransaction(from, rawTx);
  outputs.answer(payload);
  return payload;
};

exports.signByGeth = async (ask, rawTx) => {
  const from = await askUntilValid(ask, inputs.address('Please provide the account to sign the transaction'));
  const payloadToSign = Payload.signTransaction(from, rawTx);
  outputs.answer(payloadToSign);
  const signedTx = await ask('Please provide the signed tx:');
  return exports.chooseHowToSendRawTransaction(ask, signedTx);
};

exports.signWithPrivateKey = async (ask, rawTx) => {
  const privateKey = await ask(
    'Please type your private key\nExample: (0x197...)'
  );
  // hex0x
  const signedTx = signByKey.signWithPrivateKey(rawTx, privateKey);
  return exports.chooseHowToSendRawTransaction(ask, signedTx);
};

exports.signWithHardwareWallet = async (ask, rawTx) => {
  const inputsForHardware = hardware.ledger(rawTx);
  console.log(inputsForHardware);
  console.log('Please type the signature (v, r, s) here:\n');
  const v = await ask('Please provide v: (Example: (1b)')
  const r = await ask('Please provide r: (Example: (feee...)')
  const s = await ask('Please provide s: (Example: (feee...)')
  const rsv = '0x' + r + s + v;
  const signature = Signature.fromHex0x(rsv);
  const payload = fromSignature(rawTx, signature);
  console.log(payload);
};

exports.chooseHowToSendRawTransaction = async (ask, signedTx) => {
  // payload
  const payload = Payload.sendRawTransaction(signedTx);
  outputs.answer(payload);
  return payload;
};

const showEtherscan = (txHash) => {
  return `https://rinkeby.etherscan.io/tx/${txHash}`;
};

exports.readContract = async (ask) => {
  const abiPath = await ask(
    'Please type the path to the abi json file, i.e. (./abis/Offers.json):'
  );
  // TODO: it's vulnerable to load a json file with any path, better to add some check
  // but for simplicity, I'm allowing it for now.
  const abiJSON = require(abiPath);
  const { method, params } = await exports.askContractorReadMethodCall(ask, abiJSON);
  const contractAddress = await ask(
    'contractAddress (0x57831a0c76ba6b4fdcbadd6cb48cb26e8fc15e93): '
  );
  const query = readActions.readContract(abiJSON, contractAddress, method, params);
  return exports.chooseHowToCall(ask, query);
};

exports.chooseHowToCall = async (ask, query) => {
  let blockNumber = await ask('Optional: specify with a blockNumber:');
  blockNumber = blockNumber === '' ? null : parseInt(blockNumber, 10);
  blockNumber = isNaN(blockNumber) ? null : blockNumber;
  const payload = Payload.callWithQuery(query, blockNumber);
  outputs.answer(payload);
  return payload;
};

exports.queryNonce = async (ask) => {
  const address = await askUntilValid(ask,
    inputs.address(
      'Please type the address i.e. (0xFF0E3299e55EFD859176D582FC805481e8344915): '
    )
  );
  const payload = Payload.getTransactionCount(address);
  outputs.answer(payload);
  return payload;
};

exports.decodeTransactionData = async (ask) => {
  const abiPath = await ask(
    'Please type the path to the abi json file, i.e. (./abis/Offers.json):'
  );
  // TODO: it's vulnerable to load a json file with any path, better to add some check
  // but for simplicity, I'm allowing it for now.
  const abiJSON = require(abiPath);
  // hex0x
  const txData = await askUntilValid(ask, inputs.hex0x(
    'Please type the transaction data i.e. (0xfb3790c50000000000000000000000000000000000000000000000000000000000001783'));
  // The first 4 bytes are function signature
  const funcSignature = txData.substr(0, 2 + 4 * 2);
  const funcParams = txData.substr(2 + 4 * 2);
  const method = findMethodBySignature(abiJSON, funcSignature);
  if (!method) {
    throw new Error('Method not found by the signature: ' + funcSignature);
  }
  console.log(method);
  const decoded = decodeParameters(method.inputs, funcParams);
  const obj = JSON.stringify(decoded);
  outputs.answer(obj);
  return obj;
};

exports.showTransactionData = async (ask, rawTx) => {
  const txData = JSON.stringify(rawTx, null, 2);
  outputs.answer(txData);
  return txData;
};
