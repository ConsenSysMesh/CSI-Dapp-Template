# drizzle-Box-Build

A simple form using the drizzle truffle box that does the following: 

1. Takes form input and commits it on chain (report description, timestamp, latitude, longitude)
2. Updates user interface when newest form submission posts to blockchain

Note that this guide has a preference toward MAC OS, although you should be able to find complimentary guides on the truffle framework website for Windows OS. 

## Getting Started

Clone the Repo from Git

## Starting (Your Own Version) on TestRPC (Local Testnet)

For those with MacOS, download Ganache here: http://truffleframework.com/ganache/. This will visualize your local blockchain (so that you can see all transactions, associated 'costs' and otherwise). Ganache is the new way to interact with TestRPC without having 10 terminals open. For those of you with Windows or other OS, you should be able to find your download(s) here: https://github.com/trufflesuite/ganache/releases


Go ahead and start Ganache by opening the application on your computer. You should see something like this: 
![alt text](http://truffleframework.com/images/suite/ganache/ganache-window.png)


Open your terminal and 'cd' (change directory) to the appropiate folder, where you have downloaded and unzipped the repo. Then compile and migrate your smart contracts like so (make sure that you have installed all dependencies related to truffle here: http://truffleframework.com/docs/getting_started/installation): 
```
> truffle compile
> truffle migrate 
```

IMPORTANT! - Make sure, before you deploy the application locally via 'npm start' in your terminal, that your MetaMask is on the 'Localhost 8545' network. Here are the steps to ensure that it is: 

1. Download MetaMask if you haven't already and make an account  

2. Make sure to log out of that account, you should see the following screen: 
![alt text](https://steemitimages.com/0x0/http://i.imgsafe.org/1a87d9810c.png)

3. Go to Ganache (application shown in first image of the README), you should see a mnemonic at the top of the application shown as 12 random words. Copy these words on your computer. 

4. Press the "Unlock" button on MetaMask, follow the prompts and paste the 12 words into MetaMask (you are now unlocking a test network account in which you can use fake ETH to fund your transactions). 

5. Go to the top left of the MetaMask application where it says 'Main Ethereum Network.' Click and you will see a drop down listing other networks. Choose the 'Localhost 8545 network. You should have a balance of 100 ETH. If you don't, make sure to click on the Account circle in the top left hand side of the application, go down to settings, and scroll down and press the button that says "Reset Account."

6. Now return to your open terminal and use the following command: 
```
> npm start
```

7. A web page should open up and show the interface of your DApp (Decentralized Application). For this DApp, you should see a form, test it out and enter the details and press the submit button. You should get a prompt from MetaMask to 'sign' the transaction (authorize it). You're good to go!

## Starting (Your Own Version) on Rinkeby (Actual Testnet)

Have terminal open in the folder path of the project on your computer. Before migrating to testnet, make sure that the application's smart contracts build is up to date. To do this, do the following: 

1. Go to the "build" folder of the project. It should be one of the first, outermost folders in the project 
2. Open the contracts folder
3. Delete all contents of the contracts folder
4. Go to terminal window (in which you should be in the folder path of the project)
5. Use the following command: 
```
> truffle compile
```

Next, go to the 'truffle.js' config file in the outermost level of the project and change the private key to your test wallet private key (rinkeby). Note, there are no real funds in the current private key's wallet and I do not suggest that you use a private key (even on rinkeby) from a wallet that has mainnet funds, unless you like losing money :)

Afterwards, go to https://infura.io/signup and get yourself an account - this will give you access to a node so that you can migrate your DApp's contracts onto various Ethereum networks. Use the Rinkeby url they send you via email, which should have your API token at the end of it, and replace line 20 in the truffle.js with the following:
```
> return new PrivateKeyProvider([Your Private Key to Test Wallet], 'https://rinkeby.infura.io/[Your API Token from Infura]') 
```

Once you have changed your private key in the 'tuffle.js' config file. Open your terminal (again, which should be in the folder path of the project) and thenmigrate your smart contracts to the Rinkeby network like so (make sure that you have installed all dependencies related to truffle here: https://medium.com/@jasoons/migrating-an-ethereum-smart-contract-to-a-live-network-with-truffle-d5d35fcec327): 
```
> truffle migrate --network rinkeby 
```

Now return to your open terminal and use the following command: 
```
> npm start
```

7. A web page should open up and show the interface of your DApp (Decentralized Application). For this DApp, you should see a form, test it out and enter the details and press the submit button. You should get a prompt from MetaMask to 'sign' the transaction (authorize it). You're good to go!

### TODO:
* Complete tx without user being charged 


## Resources

* http://truffleframework.com/docs/drizzle/getting-started
* http://truffleframework.com/boxes/drizzle

