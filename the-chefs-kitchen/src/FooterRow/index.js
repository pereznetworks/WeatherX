// importing modules
import React, { Component } from 'react';

// importing css
import '../App.css';
import { Row, Col } from 'react-bootstrap';
import '../custom.css';

// the custom component
class FooterRow extends Component {
  render() {
    return (
      <Row id="footer" className="py-3">
        <Col xs={12} md={12} class="col text-md-center">
          <a href="../../public/index.html">
            <small>
              &copy; Daniel Perez, Capstone Project for FSJS Tech Degree from
              Team Treehouse
            </small>
          </a>
        </Col>
      </Row>
    );
  }
}

export default FooterRow;
