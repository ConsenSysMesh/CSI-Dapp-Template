/* Home View without the use of drizzle components */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container } from 'reactstrap';
//components
import Header from '../../components/Header'
//import TransactionRow from '../../components/TransactionRow'
//styles
import styles from '../../../css/main'

class Transactions extends Component {
  constructor(props, context) {
    super(props)
    /* Get contract data by accessing the contracts via 'context'. */
    this.contracts = context.drizzle.contracts
    /* bind handle functions to front end */
    this.getTxRows = this.getTxRows.bind(this)
    //set state
    this.state = {
      number: 0,
      datakeys: []
    }
  }

  componentDidMount() {
    var keys = []
    if (this.props.drizzleStatus.initialized) {
      console.log("Component Did Mount and Drizzle Initialized")
      var number = this.contracts.ComplexStorage.getNumReports.call()
      console.log(number)
      for (var i = 0; i < number; i++) {
        var datakey = this.contracts.ComplexStorage.methods.queryReportHash.cacheCall(number)
        keys.push(datakey)
      }

      this.setState({
        datakeys: keys,
        number: number
      })
    }
  }


  getTxRows(num) {
    /*
    return this.props.transactions.map((transaction) =>
      <TransactionRow reporthash={} reporttimestamp={} reportlat={}
      reportlong={} />
    )
    */

  }

  render() {

    return(
        <div>
          <Header />
          <div style={styles.toBeCreated}>
            <Container>
              <p>Transaction Page: To be made!</p>
            </Container>
          </div>
        </div>
    )
  }
}

Transactions.contextTypes = {
  drizzle: PropTypes.object
}

export default Transactions
