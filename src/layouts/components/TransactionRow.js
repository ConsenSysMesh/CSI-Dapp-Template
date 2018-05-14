import React from 'react';
import { Row, Col } from 'reactstrap';

export default class TransactionRow extends React.Component {

  render() {
    return (
      <Row>
        <h4>Report {this.props.reportNum}</h4>
        <Col>
          <h5>Report Details</h5>
          <Row>Report Hash: {this.props.reporthash}</Row>
          <Row>Report Timestamp: {this.props.reporttimestamp}</Row>
          <Row>Report Latitude: {this.props.reportlat}</Row>
          <Row>Report Longitude: {this.props.reportlong}</Row>
        </Col>
      </Row>
    );
  }
}
