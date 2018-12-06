// importing modules
import React, { Component } from 'react';

// importing css
import '../App.css';
import { Jumbotron } from 'react-bootstrap';
import '../custom.css';

// the custom component
class CustomJumbotron extends Component {
  render() {
    return (
      <Jumbotron
        className="jumbotron jumbotron-fluid bg-info text-white mb-0"
        id="jumbotron-custom"
      >
        <div className="jumbotron-container text-sm-center pt-5">
          <h1 id="jumbotron-h1" className="display-2">
            The Chef's Kitchen
          </h1>
          <p className="lead">
            THE APP for Chefs and anyone who loves to cook!
          </p>
        </div>
      </Jumbotron>
    );
  }
}
export default CustomJumbotron;
