// importing modules
import React, { Component } from 'react';

// importing css
import '../App.css';
import { Row, Col } from 'react-bootstrap';
import '../custom.css';

// the custom component
class ResultsRow extends Component {
  render() {
    return (
      <Row>
        {/* TODO: on search form submit...
            the searchForm's handleSubmit function will...
              be pass the search term to a apicall function
            respective calls to api's will be made and results returned
            results will be passed to a resultsFunction
             resultsFunction  depending on the type of media will...
             pass results to either a map, video or json parsing function to be parsed...
             the html formatted results will then ...
             be passed the ResultsRow component and rendered
      */}

        <Col xs={6} md={4} className="col-lg order-lg-2">
          <h3 class="mb-4">Videos</h3>
          <p>links to videos about searched item will be listed here </p>
        </Col>
        <Col xs={6} md={4} className="col-lg order-lg-1">
          <h3 class="mb-4">Recipes, etc</h3>
          <p>
            links to Recipes and info about item searched will be listed here
          </p>
        </Col>
        <Col xs={6} md={4} className="col-lg order-lg-3">
          <h3 class="mb-4">Where to get it</h3>
          <p>links to placed to get the searched item will be listed here</p>
        </Col>
      </Row>
    );
  }
}

export default AboutRow;
