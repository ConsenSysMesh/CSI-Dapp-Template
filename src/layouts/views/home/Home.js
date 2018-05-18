/* Home View without the use of drizzle components */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AccountData, ContractData } from 'drizzle-react-components'
import { Button, Form, FormGroup, Input, Container, Row, Col} from 'reactstrap'
//resources
  //const sigUtil = require("eth-sig-util")
//components
import Header from '../../components/Header'
import Loadable from 'react-loading-overlay'

class Home extends Component {
  constructor(props, context) {
    super(props)

    /* Get contract data by accessing the contracts via 'context'. */
    this.contracts = context.drizzle.contracts

    /* bind handle functions to front end */
    this.handleReportButton = this.handleReportButton.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.getMyLocation = this.getMyLocation.bind(this)
    this.submitReport = this.submitReport.bind(this)
    /* local state variables */
    this.state = {
      report: "",             //for report text submission in report
      lat: 0,                 //for latitude submission in report
      lng: 0,                 //for longitude submission  in report
      timestamp: Date.now(),  //for timestamp submission in report
      signedJSON: '',         //signing message to pass on to server to pay gas fee/not user
      address: '',            //address of user to be recorded for signing message tx
    }
  }

  componentDidMount() {
    //setting the address state to the user's address
    this.setState({
      address: this.props.accounts['0'],
    })

    //prompting for the user's location
    this.getMyLocation()

    //give us contract sync txStatus
    if (this.props.drizzleStatus.initialized) {
      console.log(this.props.contracts.ComplexStorage.synced)
    }
  }

  getMyLocation() {
    //get the location of the user
    const location = window.navigator && window.navigator.geolocation
    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
      })
    }
  }

  handleReportButton() {
    /* this is where we handle our report submission
    we will use two methods, one normal method employing the drizzle contract state (and pay for tx)
    and another method that pushes payment to another adddress */

    //normal method employing the drizzle contract state (and pay for tx)
    this.contracts.ComplexStorage.methods.makeReport.cacheSend(this.state.report, this.state.timestamp, this.state.lat, this.state.lng)

    //clear input form
    this.setState({ report: '' })

    //method that pushes payment to another adddress
    //setting msgParams
    /*
    let msgParams = [
      {
        type: 'string',      // Any valid solidity type
        name: 'Report',     // Any string label you want
        value: this.state.report  // The value to sign
      },
      {
        type: 'uint64',      // Any valid solidity type
        name: 'Timestamp',     // Any string label you want
        value: this.state.timestamp  // The value to sign
      },
      {
        type: 'uint8',      // Any valid solidity type
        name: 'Latitude',     // Any string label you want
        value: this.state.lat  // The value to sign
      },
      {
        type: 'uint8',      // Any valid solidity type
        name: 'Longitude',     // Any string label you want
        value: this.state.lng  // The value to sign
      },
    ]
    console.log(this.state.timestamp)
    //setting current providers params
    var from = this.state.address
    var params = [msgParams, from]
    var method = 'eth_signTypedData'
    //feedback to console that things aren't falling apart back here
    console.log("Hash is: " + sigUtil.typedSignatureHash(msgParams));

    // Invoke the eth_signTypedData function and pass in the message and account address.
    this.context.drizzle.web3.currentProvider.sendAsync({
      method,
      params,
      from,
    }, function (err, result) {
      if (err) return console.dir(err)
      if (result.error) {
        alert(result.error.message)
      }
      if (result.error) return console.error(result)
      this.setState({
        signedJSON: JSON.stringify(result.result)
      })
      console.log('PERSONAL SIGNED:' + JSON.stringify(result.result))
    })
    */

    //this.submitReport()
  }

  submitReport() {
    //needed....????? wouldnt make sense
    /*
      1. User submits data
      2. Data packaged up and then
      3. Msg signed into a msg
      3. Data stored in off store along with signature as unique id
      4. Data sent to another address (the server), which then executes the signature, along with
      the data with it

      Issue: How do you recover the original address from the signature if you have variable input? The voting example had fixed inputs that were easy to predict.

    this.contracts.ComplexStorage.methods.makeReport().cacheSend(this.state.report, this.state.timestamp, this.state.lat, this.state.lng, this.state.signedJSON, {gas: 140000, from: this.state.address}).then(function() {
      console.log('Done')
    })
    */
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return(
        <div>
          <Loadable
            active={!this.props.contracts.ComplexStorage.synced}
            spinner
            text='Report being confirmed...'>

            <Header />

            <div style={{justifyContent: 'center', paddingLeft: 150, paddingRight: 150}}>
              <Container>
                <Row>
                  <Col>
                    <h3>Active Account</h3>
                    <AccountData accountIndex="0" units="ether" precision="3" />
                  </Col>
                </Row>

                <br/>

                <Row>
                  <Col>
                    <h3>Incident Report Form</h3>
                    <h5>Number of Submitted Reports: <ContractData contract="ComplexStorage" method="getNumReports" />
                    </h5>
                    <p>Make a report that can be immutably saved to the ethereum blockchain. Please detail your incident below. Please make sure that you have geolocation enabled so that we can geotag the location of your report.</p>
                    <Form>
                      <FormGroup>
                        <Input type="textarea" name="report" id="report" value={this.state.report} onChange={this.handleInputChange} />
                      </FormGroup>
                      <Button color="danger" onClick={this.handleReportButton}>Submit Report</Button>
                    </Form>
                  </Col>
                </Row>

                <br/><br/>

                <Row>
                  <Col>
                    <h3>Last Submitted Report Details:</h3>
                    <ul>
                      <li>Report Hash: <ContractData contract="ComplexStorage" method="queryLastReportHash" />
                      </li>
                      <li>Report Timestamp: <ContractData contract="ComplexStorage" method="queryLastReportTimestamp" />
                      </li>
                      <li>Report Geotag: <ContractData contract="ComplexStorage" method="queryLastReportLat" />, <ContractData contract="ComplexStorage" method="queryLastReportLng" />
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Container>
            </div>
          </Loadable>
        </div>
    )
  }
}

Home.contextTypes = {
  drizzle: PropTypes.object
}

export default Home
