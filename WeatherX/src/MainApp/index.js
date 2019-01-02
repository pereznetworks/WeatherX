import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';
import '../css/App.css';
import '../css/grid-main.css';

// importing custom components
import TitleBar from '../Components/titleBar.js';
import NavBar from '../Components/navBar.js';
import MainContents from '../Components/mainContents.js';

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
          <div className="left-margin">
          </div>
          <div className="middle">
            <TitleBar />
            <NavBar />
            <MainContents />
          </div>
          <div className="right-margin">
          </div>
        </div>
    );
  } // end render()

} // end App component

export default MainApp;
