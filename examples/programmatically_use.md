## How to use txgun programmatically to send transactions in batch?

If you want to programmatically making multiple txs to write to a contract. You can write a script using txgun.

```js
const { writeContract } = require('txgun/flows');
const YOUR_PRIVATE_KEY = '0xXXXXXXXXXXXXXXX_YOUR_PRIVATE_KEY_HERE';
const inputs = [
  [
    '3',
    './tests/abis/TestContract.json',
    'createToken',
    '30'
    '0xc34518fd04ff34a566430ebe9ca82161fc8b767d',
    '0x02153c5dd85440f4e0c084bc6f178ed2f3fdd6ca2c4c5ac4a98ab7f68f140479',
    '0x57831a0c76ba6b4fdcbadd6cb48cb26e8fc15e93',
    '0',
    '10000000000',
    '10000',0000000
    '4',
    YOUR_PRIVATE_KEY,
    'y',
    'y',
  ],
  [
    '3',
    './tests/abis/TestContract.json',
    'createToken',
    '31'
    '0xc34518fd04ff34a566430ebe9ca82161fc8b767d',
    '0x02153c5dd85440f4e0c084bc6f178ed2f3fdd6ca2c4c5ac4a98ab7f68f140479',
    '0x57831a0c76ba6b4fdcbadd6cb48cb26e8fc15e93',
    '0',
    '10000000000',
    '10000',0000000
    '5',
    YOUR_PRIVATE_KEY,
    'y',
    'y',
  ],
];

const sendJSONRPC = async (payload) => {
  return axios.post('https://rinkeby.infura.io/', payload);
};

const sendOne = async (input) => {
  const jsonrpcpayload = await writeContract((question) => {
    console.log({ question });
    return input.shift();
  });
  await sendJSONRPC(jsonrpcpayload);
};

const main = async () => {
  // sign and send txs one by one
  for (let i = 0; i < inputs.length; i++) {
    await sendOne(inputs[i]);
  }
};

main();
