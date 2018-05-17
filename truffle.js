//const HDWalletProvider = require("truffle-hdwallet-provider")
//const mnemonic = "solution limit tip risk custom soft cement fatigue accuse deputy youth hammer"
//to use pk and not mnemonic
var PrivateKeyProvider = require("truffle-privatekey-provider");
const privKey = "9743959134711147C2D4E18B0CDDC80FB33EEB97D137E9E37C5A68874F2B9D74"

//latest deployed contract address: 0xdac2ff7c887cd14cde7e6e8411f6b40eba1f3cc1
//on rinkeby 
module.exports = {
  migrations_directory: "./migrations",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
        //return new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/CnZO2MtdzUwRXRDl941y")
        return new PrivateKeyProvider(privKey, 'https://rinkeby.infura.io/CnZO2MtdzUwRXRDl941y')
      },
      network_id: '4'
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 500
    }
  }
};
