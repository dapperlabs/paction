1. ask to choose action:
   - 2.1 transferEther
   - 2.2 deployContract
   - 2.3 writeContract
   - 2.4 readContract
2.1. if 1 is transferEther, ask for:
     - to
       - value
         - nonce
           - gasPrice
2.2. if 1 is deployContract, ask for:
     - abiJSON
       - params (for each)
         - value (prefilled)
           - nonce
             - gasPrice
               - gasLimit (prefilled)
2.3. if 1 is writeContract, ask for:
     - abiJSON
       - method
         - params (for each)
           - contractAddress
             - value
               - nonce
                 - gasPrice
                   - gasLimit (prefilled)

2.4. if 1 is readContract, ask for:
     - method
       - params (for each)
         - contractAddress

3. if 2 is 2.4, show eth_call payload, ask for
   - fullNodeURL
     | query, display, succeed and exit, fail and ask retry

3. if 2 is 2.1  |  2.2  |  2.3, display the rawTx, ask to choose:
   - 3.1 send to the geth node to sign and send
   - 3.2* generates payload for dapper signing service to sign and send
   - 3.3 provide private key to sign
   - 3.4 show the input for hardware wallet to sign

3.1 ask for:
   - fullNodeURL

3.3 ask for:
   - 3.4 privateKey

3.4 show the transaction json for signing, ask:
   - signature of
    - send to a full node
      - fullNodeURL


