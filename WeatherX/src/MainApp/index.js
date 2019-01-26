import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';
import '../css/App.css';
import '../css/grid-main2.css';

// importing custom components
import Middle from '../Components';

// import accessToken from './config.js';
// importing mapbox accessToken from separate gitgnored file


class MainApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
      // no state at this level yet
    };
  } // end constructor()

  render() {
    return (
      <div id="Main" className="grid-main">
        <div className="left-margin"><p className="fillin"></p></div>
        <Middle />
        <div className="right-margin"><p className="fillin"></p></div>
      </div>
    );
  } // end render()

} // end App component

export default MainApp;
