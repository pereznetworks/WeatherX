import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';
import './css/App.css';
import './css/grid-main2.css';

// importing custom components
import Middle from './Components';

// import accessToken from './config.js';
// importing mapbox accessToken from separate gitgnored file


export default class App extends Component {

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
        <div className="left-margin"></div>
        <Middle />
        <div className="right-margin"></div>
      </div>
    );
  } // end render()

}; // end App component
