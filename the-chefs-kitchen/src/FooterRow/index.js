// importing modules
import React, { Component } from 'react';

// importing css
import '../App.css';
import 'react-bootstrap';
import '../custom.css';

// the custom component
class FooterRow extends Component {
  render() {
    return (
      <footer id="footer">
        <a href="../../public/index.html">
          <small>
            &copy; Daniel Perez, Capstone Project for FSJS Tech Degree from Team
            Treehouse
          </small>
        </a>
      </footer>
    );
  }
}

export default FooterRow;
