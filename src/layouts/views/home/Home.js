/* Home View without the use of drizzle components */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AccountData, ContractData } from 'drizzle-react-components'
import { Button, Form, FormGroup, Input, Container, Row, Col} from 'reactstrap'
//components
import Header from '../../components/Header'

class Home extends Component {
  constructor(props, context) {
    super(props)

    /* Get contract data by accessing the contracts via 'context'. */
    this.contracts = context.drizzle.contracts
    /* bind handle functions to front end */
    this.handleReportButton = this.handleReportButton.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.getMyLocation = this.getMyLocation.bind(this)
    /* local state variables */
    this.state = {
      report: "",
      lat: '',
      lng: '',
      timestamp: Date.now(),
    }
  }

  componentDidMount() {
    this.getMyLocation()
  }

  getMyLocation() {
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
    this.contracts.ComplexStorage.methods.makeReport(this.state.report, this.state.timestamp, this.state.lat, this.state.lng).send()
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }



  render() {

    return(
        <div>
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

        </div>
    )
  }
}

Home.contextTypes = {
  drizzle: PropTypes.object
}

export default Home
