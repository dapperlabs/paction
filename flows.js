const signByKey = require('./signby/key');
const writeActions = require('./actions/write');
const { makeTxBase } = require('./ethereum/transaction');
const { chooseOneOf } = require('./cli/inputs');
const hardware = require('./signby/hardware');
const fromSignature = require('./jsonrpc/payload/from');
const Payload = require('./jsonrpc/payload');
const { showAllWrites, showConstructor } = require('./cli/abi');
const { sequential } = require('./utils/async');

exports.entry = async ask => {
  const action = await ask(
    chooseOneOf('actions', [
      'Transfer Ether',
      'Deploy a contract',
      'Make a method call to a deployed contract',
      'Read a contract'
    ])
  );
  if (false) {
  } else if (action === '1') {
    return exports.transferEther(ask);
  } else if (action === '2') {
    return exports.deployContract(ask);
  } else if (action === '3') {
    return exports.writeContract(ask);
  } else if (action === '4') {
    return exports.readContract(ask);
  }
};

exports.transferEther = async ask => {
  const to = await ask(
    'Please type the address of the your receiptian, i.e. (0xFF0E3299e55EFD859176D582FC805481e8344915): '
  );
  const value = await ask(
    'Please type the Ether value you would like to send in wei:\nExample: (10000000000) for 10 gwei'
  );
  const nonce = parseInt(await ask('Please type the nonce, i.e. (30):'), 10);
  const gasPrice = await ask(
    'Please type the gas price in wei:\nExample: (10000000000) for 10 gwei'
  );
  console.log({ to, value, nonce, gasPrice });
  const rawTx = writeActions.transferEther(nonce, value, gasPrice, to);
  return exports.chooseHowToSign(ask, rawTx);
};

const askOneParam = ask => {
  return async param => {
    return ask(
      `Please type the constructor argument for "${param.name} (${
        param.type
      })":`
    );
  };
};

const askConstructors = async (ask, constructor) => {
  const inputs = constructor.inputs;
  // [string]
  const all = await sequential(askOneParam(ask), inputs);
  return all;
};

exports.deployContract = async ask => {
  const abiPath = await ask(
    'Please type the path to the abi json file, i.e. (./abis/Offers.json):'
  );
  // TODO: it's vulnerable to load a json file with any path, better to add some check
  // but for simplicity, I'm allowing it for now.
  const abiJSON = require(abiPath);
  const constructor = showConstructor(abiJSON);
  console.log('Parsed contract constructor:');
  console.log(constructor);
  const params = await askConstructors(ask, constructor);
  let value = '0';
  if (constructor.payable) {
    value = await ask(
      'Please type the Ether value you would like to send to the contract constructor in wei:\nExample: (10000000000) for 10 gwei'
    );
  }
  const nonce = parseInt(await ask('Please type the nonce, i.e. (30):'), 10);
  const gasPrice = await ask(
    'Please type the gas price in wei:\nExample: (10000000000) for 10 gwei'
  );
  const gasLimit = await ask(
    'Please type the gas limit in wei:\nExample: (10) for 10 gas'
  );
  const txBase = makeTxBase(nonce, gasPrice, gasLimit, value);
  const rawTx = writeActions.deployContract(abiJSON, txBase, params);
  return exports.chooseHowToSign(ask, rawTx);
};

exports.writeContract = async ask => {
  const contractName = await ask('contract (Offers): ');
  const method = await ask('method (setCOO): ');
  const params = await ask(
    'params (0x57831a0c76ba6b4fdcbadd6cb48cb26e8fc15e93): '
  );
  const contractAddress = await ask(
    'contractAddress (0x57831a0c76ba6b4fdcbadd6cb48cb26e8fc15e93): '
  );
  const value = await ask('value: ');
  const nonce = await ask('nonce: ');
  const gasPrice = await ask('gasPrice: ');
  const gasLimit = await ask('gasLimit: ');
  console.log({ contractName, method, params, value, nonce, gasPrice });
  const txBase = makeTxBase(nonce, gasPrice, gasLimit, value);
  const rawTx = writeActions.writeContract(
    contractName,
    txBase,
    contractAddress,
    method,
    params
  );
  return exports.chooseHowToSign(ask, rawTx);
};

exports.chooseHowToSign = async (ask, rawTx) => {
  console.log(rawTx);
  const choice = await ask(
    chooseOneOf('ways to sign', [
      'send to the geth node to sign and send',
      'generates payload for dapper signing service to sign and send',
      'Provide private key to sign',
      'show the json transaction for your own wallet to sign',
      'show the js code for signing with your metamask wallet'
    ])
  );

  if (false) {
  } else if (choice === '1') {
  } else if (choice === '2') {
  } else if (choice === '3') {
    return exports.signWithPrivateKey(ask, rawTx);
  } else if (choice === '4') {
    return exports.signWithHardwareWallet(ask, rawTx);
  } else if (choice === '5') {
  }
};

exports.signWithPrivateKey = async (ask, rawTx) => {
  const privateKey = await ask(
    'Please type your private key\nExample: (0x197...)'
  );
  // hex0x
  const signedTx = signByKey.signWithPrivateKey(rawTx, privateKey);
  exports.chooseHowToSendRawTransaction(ask, signedTx);
};

exports.signWithHardwareWallet = async (ask, rawTx) => {
  const inputsForTezor = hardware.tezor(rawTx);
  console.log(inputsForTezor);
  // hex0x
  const signature = await ask('please put your signature here:\n');
  // hex0x
  const signedTx = fromSignature(rawTx, signature);
  exports.chooseHowToSendRawTransaction(ask, signedTx);
};

exports.chooseHowToSendRawTransaction = async (ask, signedTx) => {
  // payload
  const payload = Payload.sendRawTransaction(signedTx);
  console.log(payload);
};
