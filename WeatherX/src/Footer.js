import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from './logo.svg';
import './App.css';
import './custom-grid.css';

class Footer extends Component {

  render() {
    return (
        <footer className="footer" style={{flex:1}}>
          {/*<img src={logo} className="App-logo" alt="logo" />*/}
          <a className="App-link" href="http://dap-dev.herokuapp.com" target="_blank" rel="noopener noreferrer">
            WeatherX, weather forecasting and mapping, by Daniel's AppWorks
          </a>
        </footer>
    );
  } // end render()

} // end App component

export default Footer;
