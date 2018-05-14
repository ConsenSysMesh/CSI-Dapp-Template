import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
//components
import Header from '../../components/Header';

class Home extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <Header />

          <div className="pure-u-1-1">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />

            <br/><br/>
          </div>

          <div className="pure-u-1-1">
            <h2>Incident Report Form</h2>
            <h3>Number of Submitted Reports: <ContractData contract="ComplexStorage" method="getNumReports" />
            </h3>
            <p>Make a report that can be immutably saved to the ethereum blockchain. Please detail your incident below. Please make sure that you have geolocation enabled so that we can geotag the location of your report.</p>
            <ContractForm contract="ComplexStorage" method="makeReport" labels={['Report Summary', 'Timestamp', 'Incident Latitude', 'Incident Longitude']}/>

            <br/><br/>
            <p>
              <h3>Last Submitted Report Details:</h3>
              <ul>
                <li>Report Hash: <ContractData contract="ComplexStorage" method="queryReportHash" />
                </li>
                <li>Report Timestamp: <ContractData contract="ComplexStorage" method="queryReportTimestamp" />
                </li>
                <li>Report Geotag: <ContractData contract="ComplexStorage" method="queryReportLat" />, <ContractData contract="ComplexStorage" method="queryReportLng" />
                </li>
              </ul>
            </p>

            <br/><br/>
          </div>
        </div>
      </main>
    )
  }
}

export default Home
