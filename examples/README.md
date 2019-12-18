# Examples
## Write data to a smart contract deployed on rinkeby using provided private key
The following example shows how to write data to a deployed smart contract.

The process is interactive.
First, run `paction`. paction will start asking you questions for inputs.
In the end, it returns a jsonrpc payload, which can be sent to any ethereum node that supports JSONRPC to write to your contract.

```
paction
Please choose one of the following actions:
1. Transfer Ether
2. Deploy a contract
3. Make a method call to a deployed contract
4. Read a contract
5. Query the current nonce for an account
6. Decode transaction data
3

Please type the path to the abi json file, i.e. (./tests/abis/TestContract.json):
./tests/abis/TestContract.json

createToken(uint256 tokenId_, address owner_, bytes32 metadata_) returns ()
Please type the method name:
Example: (createToken)
createToken

Please type the function argument of "tokenId_ (uint256)"
30

Please type the function argument of "owner_ (address)"
0xc34518fd04ff34a566430ebe9ca82161fc8b767d

Please type the function argument of "metadata_ (bytes32)"
0x02153c5dd85440f4e0c084bc6f178ed2f3fdd6ca2c4c5ac4a98ab7f68f140479

contractAddress (0x57831a0c76ba6b4fdcbadd6cb48cb26e8fc15e93):
0x57831a0c76ba6b4fdcbadd6cb48cb26e8fc15e93

Please type the nonce, i.e. (30):
0

Please type the gas price in wei:
Example: (10000000000) for 10 gwei
10000000000

Please type the gas limit in wei:
Example: (10000) for 10000 gas
10000

Please choose one of the following ways to sign:
1. send to the geth node to sign and send
2. send to the geth node and get back raw transaction with the signature
3. generates payload for dapper signing service to sign and send
4. Provide private key to sign
5. show transaction data
4

Please type your private key
Example: (0x197...)
0x5F8BEEB98505C6156DA29E8349AA0D37B272834726C29F5B43600331B1F4C40F

Allow paction to query the nonce for you? y/n
n

nonce to use: 0
Would you like paction to send the payload for you? y/n
n

{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["0xf8c9808502540be4008227109457831a0c76ba6b4fdcbadd6cb48cb26e8fc15e9380b864f330f857000000000000000000000000000000000000000000000000000000000000001e000000000000000000000000c34518fd04ff34a566430ebe9ca82161fc8b767d02153c5dd85440f4e0c084bc6f178ed2f3fdd6ca2c4c5ac4a98ab7f68f1404791ca0285a7575c35bb8b5fd55f1cdb44dd609777b98e645aa614c9a5c31a78bdd6582a04641b1aed42519e1756c7e596bf022bd4692f6ce39f4aa955cec93809b79b0a9"],"id":1}
```

## Read inputs from a file to transfer ether
paction can read inputs from standard inputs, you can save your types by saving your inputs in a file and pipe it to paction to execute.

You can also copy paste the multi-line inputs.

First make a text file that contains all the inputs to the paction questions.
For instance, this is an example file that contains command to send 1 ether to another account.

```
# Transfer Ether:
1
# receiption address:
0xFF0E3299e55EFD859176D582FC805481e8344915
# eth value to be sent in wei:
1000000000
# nonce
49
# gas price - 10 gwei
10000000000
# use private key to sign the transaction
4
# private key
0x1973DEC646750D76C0A3A6E6FD7398D47F850A7161E455E55DFA28439A937E6B
# don't auto query nonce
n
# print the payload
n
```

Note, you can write comments in the input file by simply adding a `#` at the beginning of a line. paction will ignore it.

Next, you can pipe the command to paction for execution.

```
cat ./tests/cases/transferEther_providedKey.inputs | paction

Please choose one of the following actions:
1. Transfer Ether
2. Deploy a contract
3. Make a method call to a deployed contract
4. Read a contract
5. Query the current nonce for an account
6. Decode transaction data
# Transfer Ether:
1
# receiption address:
0xFF0E3299e55EFD859176D582FC805481e8344915
# eth value to be sent in wei:
1000000000
# nonce
49
# gas price - 10 gwei
10000000000
# use private key to sign the transaction
4
# private key
0x1973DEC646750D76C0A3A6E6FD7398D47F850A7161E455E55DFA28439A937E6B
# don't auto query nonce
n
# print the payload
n
Please type the address of the your receiptian, i.e. (0xFF0E3299e55EFD859176D582FC805481e8344915):
Please type the Ether value you would like to send in wei:
Example: (10000000000) for 10 gwei
Please type the nonce, i.e. (30):
Please type the gas price in wei:
Example: (10000000000) for 10 gwei
Please choose one of the following ways to sign:
1. send to the geth node to sign and send
2. send to the geth node and get back raw transaction with the signature
3. generates payload for dapper signing service to sign and send
4. Provide private key to sign
5. show transaction data
Please type your private key
Example: (0x197...)
Allow paction to query the nonce for you? y/n
nonce to use: 31
Would you like paction to send the payload for you? y/n
{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":["0xf868318502540be40082520894ff0e3299e55efd859176d582fc805481e8344915843b9aca00801ba0d9d6ed27e84ad0ade71c303a42872694a45fc706327c7d7d5b9bd47898345a8aa05397ad86fbd5770da834cc34bc24c5c55224872807e9f14ab2b2b98c578410e6"],"id":1}
```
