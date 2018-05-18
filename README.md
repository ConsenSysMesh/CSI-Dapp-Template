# drizzle-Box-Build DApp Template

The following repository serves as a template to both help you get started on your Dapp development journey and help you learn a few key things that should prove helpful for future DApp development. This particular Dapp is a simple form using the drizzle truffle box that does the following: 

1. Takes form input and commits it on chain (report description, timestamp, latitude, longitude)
2. Updates user interface when newest form submission posts to blockchain

The DApp includes a few useful features, like the following: 

1. UI Responds to inform user that the transaction is pending after submission 
2. Form takes the user's geotag to minimize amount of input necessary in the form 
3. Form utilize a methodology in which you can either use your wallet mnemonic or your private key in the configuration file (more on this later)

Note that this guide has a preference toward MAC OS, although you should be able to find complimentary guides on the truffle framework website for Windows OS. 

## Learning Materials
Already overwhelmed? No worries, check out these resources to help you better understand smart contracts (for starters). You will also wnat to look up some tutorials on React JS/React Native (Udemy is an excellent resource for this):  
1. [Complete EtherKnaught](https://ethernaut.zeppelin.solutions/) 
2. [Complete Crypto Zombies](https://cryptozombies.io/)
3. [Complete Udemy Course](https://www.udemy.com/ethereum-and-solidity-the-complete-developers-guide/learn/v4/content)
4. [React JS Udemy Course](https://www.udemy.com/react-the-complete-guide-incl-redux/)

## What is Truffle?
Truffle is a development environment, testing framework and asset pipeline for Ethereum, aiming to make life as an Ethereum developer easier. With Truffle, you get: Built-in smart contract compilation, linking, deployment and binary management.You can find all truffle resources here: http://truffleframework.com/

## What is Drizzle?
Drizzle is a collection of front-end libraries that make writing dapp front-ends easier and more predictable. The core is based on a Redux store. We take care of synchronizing your contract data, transaction data and more. Things stay fast because you declare what to keep in sync. Importantly, this means you have access to the spectacular development tools around Redux.

The core library responsible for web3, account and contract instantiation; wiring up the necessary synchronizations and providing additional contract functionality. You can learn more about drizzle here: http://truffleframework.com/blog/drizzle-reactive-ethereum-data-for-front-ends

There are a few important things to note about drizzle: 
1. Drizzle is just React Redux for Dapps - it makes it easier to user smart contract functions in your application
2. Knowing about Redux makes understanding a Drizzle-based application wayyyyyyy easier
3. THE most important thing about Drizzle is being able to access its state anywhere in your application (because this lets you reach your contract and many other helpful things across the application)

The easiest way to get started with Drizzle is to use truffle's [official drizzle-react package](https://github.com/trufflesuite/drizzle-react) and (optionally) its companion [drizzle-react-components](https://github.com/trufflesuite/drizzle-react-components).

## What is React Redux?
This link is extremely helpful to learn what the heck Redux is: https://www.valentinog.com/blog/react-redux-tutorial-beginners/

## How is a Drizzle Dapp Connected Together?
I could go on in words, but I find making a diagram much easier, and more helpful: 
![alt text](https://drive.google.com/open?id=1Zenzd1vGda0UQQnjRJqks5-frVBjuR7m)

## Important Files in this Project
The most important files in this project are the following (with definitions!):
1. Truffle.js - Your configuration file is called truffle.js and is located at the root of your project directory. This file is a Javascript file and can execute any code necessary to create your configuration. It must export an object representing your project configuration like the example below.
```
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
```
The default configuration ships with configuration for a single development network, running on 127.0.0.1:8545. There are many other configuration options, detailed here: http://truffleframework.com/docs/advanced/configuration

2. src/drizzleOptions.js - This file ultimately 'fills in' the state of the application (via the reducer). All you need to know (for now) is that this is where you want to store your contract instantiations so that the rest of the app can easily access your contract methods and variables. 

3. src/recuder.js - The state comes from reducers. A reducer is just a Javascript function. A reducer takes two parameters: the current state and an action (more about actions soon). The principle of Redux says that the state is immutable and cannot change in place. This is why the reducer must be pure. A pure function is one that returns the exact same output for the given input.

4. src/store.js - The Redux store is fundamental: the state of the whole application lives inside the store. So to start playing with Redux we should create a store for wrapping up the state.

5. src/layouts/views/home/HomeContainer.js - This file maps the application's universal state to the props of a particular component so that they can be accessed. Ex: By having 'contracts: state.contracts' in the HomeContainer.js file, you can now use things like this.props.contracts.[ContractName].synced, to check if the contract is completely synched with the application's UI

6. src/layouts/views/home/Home.js - front end component page for home page :) connects the 'back-end' to the front end to make a user experience for the user 

7. contracts folder  - has all your smart contracts 

## VERY IMPORTANT: Drizzle State
Remember, drizzle makes it easier for us to access our contract/web3js related data/methods/etc across our entire application. To do this, drizzle has its own state (which can be 'combined' with your application's pre-exisitng state if you are already using redux in your applications - again, this is different from the 'local' state of each of your components in react). So, it is important for us to know what is in the Drizzle state so that we can appropiately access what we need. The entire JSON layout of the drizzle state can be found here: https://github.com/trufflesuite/drizzle#drizzle-state

Important parts of the state to recognize: 
1. contracts - need this to access ANYTHING related to your contracts. An important sub-components of this object is the ContractName object, which would be replaced by the actual name(s) of your contract(s). More commonly, you send a transaction using a method via: 
```
//in home.js, where the name of our smart contract is 'ComplexStorage'
this.contracts = context.drizzle.contracts
this.contracts.ComplexStorage.methods.makeReport.cacheSend(this.state.report, this.state.timestamp, this.state.lat, this.state.lng) 
```
Note, the template for a method call off your contract is 'this.contracts.ContractName.methods.MethodName.cacheSend(Method Arguments)'. The cacheSend is used to synch your state with the blockchain (meaning we know when transactions are pending, etc. which is extremely useful for appropiate UI response). 

2. Which brings us to this - how in the heck do you make your UI respond as the transaction is pending? Here's how you do that: 
```
//in home.js, where the name of our smart contract is 'ComplexStorage', in the render part of file
<Loadable
    active={!this.props.contracts.ComplexStorage.synced}
    spinner
    text='Report being confirmed...'>
    <BODY OF UI></BODY OF UI>
</Loadable>
```
Here we made usage of the React Loadable component [react-loading-overlay](https://www.npmjs.com/package/react-loading-overlay), and then, for the boolean needed to determine when the page should show a loading symbol, we used the contract's sync boolean. 

3. transactions - A series of transaction objects, indexed by transaction hash.

4. drizzleStatus - An object containing information about the status of Drizzle.


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

