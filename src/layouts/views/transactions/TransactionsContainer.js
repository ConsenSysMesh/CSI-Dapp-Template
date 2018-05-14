import Transactions from './Transactions'
import { drizzleConnect } from 'drizzle-react'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts,
    ComplexStorage: state.contracts.ComplexStorage,
    transactions: state.transactions, 
    drizzleStatus: state.drizzleStatus
  }
}

const TransactionsContainer = drizzleConnect(Transactions, mapStateToProps);

export default TransactionsContainer
