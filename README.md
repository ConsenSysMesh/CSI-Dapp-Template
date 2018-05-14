# drizzle-Box-Build

A simple form using the drizzle truffle box that does the following: 

1. Takes form input and commits it on chain 
2. Updates user interface when newest form submission posts to blockchain 

## Getting Started

Clone the Repo from Git

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


### TODO:

* Grab lat,long from browser and input that value (as strings) into the state variables. Drizzle components is difficult to leverage when wanting to interact with methods directly (and not through the form, as the other inputs of the function DO need to be inputted via form)
* Grab timestamp in the same way lat and long is posted
* Complete tx without user being charged 


## Resources

* http://truffleframework.com/docs/drizzle/getting-started
* http://truffleframework.com/boxes/drizzle

