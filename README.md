## What is paction
paction is a command line tool to interact with smart contract for Ethereum.

You can use paction to deploy a smart contract, write data to a deployed contract, or read data from a deployed contract without writing a script.

## Install
### 1. From source
```
git clone git@github.com:dapperlabs/paction.git
cd paction
npm start
```

### 2. Install globally (not available, until the package is published on npm)
```
npm install -g paction
```

## Features
1. Interactive tool
No need to remember any syntax of any config file, because there is no config file at all. paction gets the config and your choices by interactively asking you questions.

2. Support automation
You can automate the process by saving your commands into a file, and pipe the file content to paction to execute.

3. Support contract deployment, read and write to a contract.
paction uses standard JSON RPC calls for the above actions.

4. Offline mode
Since paction is based on JSON PRC calls, it have the options for you to let it send the JSON RPC HTTP payload to a Ethereum Node, or print the payload and send it anytime by your own.

5. Support different signing methods for signing transactions
paction allows you to sign a transaction by your own private key or by sending to a Ethereum node that has your private key. Or you can get the transaction data and sign externally using your own wallet.

6. Support different network
paction supports mainnet and testnet (Rinkeby).

7. Dependencies
paction tries to be as lightweight as possible, it only depends on 4 official ethereum javascript libraries (ethereumjs-tx, ethereumjs-util, web3, web3-eth-abi) and 1 popular http client library (axios).

## How to run
```
export WEB3_URL=https://api.infura.io/v1/jsonrpc/rinkeby
paction
```

paction requires an environment variable: `WEB3_URL`, which specifies the network. In the above example, the `WEB3_URL` is pointing to a Rinkeby node hosted by infura, so paction needs to send transactions, it will send them to Rinkeby.

## Examples
See [here](./examples/README.md)

## Contributions
We welcome pull requests. To get started, just fork this repo, clone it locally, and run:

```
make install
source .env.example
make test
```

Please make pull requests against the `develop` branch.
