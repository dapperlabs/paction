## What is txgun
txgun is a command line to interact with smart contract.

## Problems to solve
1. Truffle is currently the only method we are using to deploy smart contracts. Truffle will deploy a Migration contract first before deploying yours in order to keep track of changes made to your contract. This stateful action introduces extra complexity to the deployment, and isn't reliable in practice.
2. Transaction Signing and Sending are highly coupled. When making a tx to write to a contract, if the private key is loaded on a geth node which is behind, then we can't use the `sendTransaction` json rpc call to send the transaction.
3. In order to interact with a smart contract, we always have to write a script to make transaction. It's time consuming to write scripts as we have to lookup all kinds of api documents.

## Features
1. Support making transaction to transfer ether, deploy a smart contract, write to a deployed contract
2. Support both mainnet and testnet
3. Support different signing methods: sign by provided private key, sign by geth node, sign by hardware wallet, sign by metamask
4. Support making json rpc querying to read a contract
6. Support reading inputs from piping
7. Support copy pasting inputs
8. No need to write script, making a transaction by answering questions.
9. Using colors to distinguish question/answer

## Why javascript
So that you can use the core in frontend, and build a web UI.

## Dependency
txgun is very lightweight, only depends on 3 official ethereum libs.

## How to run
```
yarn
node main.js
```

## Examples
### Write to a smart contract deployed on rinkeby using provided private key
<img width="832" alt="making tx" src="https://user-images.githubusercontent.com/811374/50713900-80ad7400-102b-11e9-974f-eecc14545a97.png">
<img width="833" alt="signing" src="https://user-images.githubusercontent.com/811374/50713910-8905af00-102b-11e9-9384-2059adc68314.png">
<img width="833" alt="send to infura rinkeby" src="https://user-images.githubusercontent.com/811374/50713925-9ae75200-102b-11e9-8ec8-66f42a35644e.png">

### Deploy a smart contract to rinkeby with the account loaded on a geth node, but send the signed tx to infura rinkeby
<img width="833" alt="n1" src="https://user-images.githubusercontent.com/811374/50714960-c79d6880-102f-11e9-944a-fb32afee4671.png">
<img width="1272" alt="n2" src="https://user-images.githubusercontent.com/811374/50714961-c79d6880-102f-11e9-904a-9ed5ef56c06a.png">
<img width="833" alt="n3" src="https://user-images.githubusercontent.com/811374/50714962-c79d6880-102f-11e9-9f81-7b39ac978354.png">
<img width="833" alt="n4" src="https://user-images.githubusercontent.com/811374/50714963-c835ff00-102f-11e9-9c2a-e5b920d7c516.png">
<img width="1278" alt="n5" src="https://user-images.githubusercontent.com/811374/50714964-c835ff00-102f-11e9-9c1a-d74c02191ef3.png">

### Read inputs from a file to transfer ether
txgun can read inputs from standard inputs, you can save your types by saving your inputs in a file and pipe it to txgun to execute.
You can also copy paste the multi-line inputs.
<img width="835" alt="transfer ether" src="https://user-images.githubusercontent.com/811374/50715069-409cc000-1030-11e9-9b73-ee4783e52353.png">

## TODO
- [ ] read what's the next nonce for both mainnet and testnet
- [ ] implement signing by hardware wallet
- [ ] implement signing by metamask
