import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';
import '../css/App.css';
import '../css/custom-grid.css';

// importing custom components
import InitalHeader from './InitialHeader.js'
import Footer from './Footer.js'

// import accessToken from './config.js';
// importing mapbox accessToken from separate gitgnored file


class MainApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
      // not state using at this level yet
    };
  } // end constructor()

  render() {
    return (
      <div className="App" style={{flex:1}}>
        <InitalHeader />
        <div className="devOnly-middle"></div>
        <Footer />
      </div>
    );
  } // end render()

} // end App component

export default MainApp;
