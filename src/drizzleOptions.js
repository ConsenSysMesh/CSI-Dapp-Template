/*
Purpose of file: These options connect the rest of the application to the contract
instantiations you need to get things going. This is where drizzle 'starts' per se.
*/

//Import contracts
/*
Description: from the build folder (which may not exist at first),so you need to
execute the 'truffle compile' command in the terminal (same folder path as)
this react project (but not in the 'src' folder). Remember, these are contracts
that you will want to access to manipulate the front-end, so no need to
import the Migrations.sol contract
*/
import ComplexStorage from './../build/contracts/ComplexStorage.json'

//this is where we store the instantiations, in 'options'
const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    ComplexStorage,
  ],
  polls: {
    accounts: 1500
  }
}

//export options so that others can access
export default drizzleOptions
