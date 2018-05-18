import Home from './Home'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
//for more on what the hell this is, check out here: https://github.com/trufflesuite/drizzle
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    ComplexStorage: state.contracts.ComplexStorage,
    drizzleStatus: state.drizzleStatus,
    web3: state.web3,
    transactionStack: state.transactionStack,
    transactions: state.transactions,
    contracts: state.contracts
  }
}

const HomeContainer = drizzleConnect(Home, mapStateToProps);

export default HomeContainer
