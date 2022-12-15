
# NEXT JS LOTTERY DAPP FRONTEND 

A frontend application built using NEXT JS for the Randomised Lottery smart contract.
Users can connect to the DAPP using metamask on Goerli TestNet for now. Then they fund a prize pool of GoerliETH.  
The Chainlink keepers at a fixed interval of time call the contract to get a randomised winner and transfer the whole pool GoerliETH to the winner.  

Hosted on Fleek - [Lottery DAPP](https://nextjs-lottery-fcc.on.fleek.co/)  
Contract deployed using Hardhat - [Lottery.sol](https://goerli.etherscan.io/address/0xAad95056EB2e0dC968aB1065c9846c005416E83c)  
Hardhat code & Waffle tests - [lottery-hardhat-fcc](https://github.com/RohitShah1706/lottery-hardhat-fcc) 




## Deployment

To intall this project run

```bash
  yarn install
```


To deploy this project run

```bash
  yarn run dev
```


## Acknowledgements

 - [Blockchain course FCC](https://www.youtube.com/watch?v=gyMwXuJrbJQ)
 - [Hardhat Documentation](https://hardhat.org/)  
 - [Chainlink Docs](https://docs.chain.link/)


## Authors

- [@RohitShah1706](https://github.com/RohitShah1706)

