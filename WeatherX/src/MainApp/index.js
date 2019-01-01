import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';
import '../css/App.css';
import '../css/grid-main.css';

// importing custom components

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
      <div id="Main" className="grid-main">
          <div className="left-margin">
            {/* <img id="LgreyBox" alt=""/> */}
          </div>
          <div className="middle">
            <div id="titleBar">
              <p id="logoBox"></p>
              <p id="title">Welcome to WeatherX</p>
            </div>
            <div id="navBar">
              <ul>
                <li id="liHome"><a href="#Main" id="Home">Home</a></li>
                <li id="liAbout"><a href="#Main" id="About">About</a></li>
                <li className="dropdown" id="dropDownNav">
                  <a href="#Main" className="dropbtn">Get Weather Forecast</a>
                  <div className="dropdown-content">
                    <a href="#Main" id="useMyLocation">Use My Location</a>
                    <a href="#Main" id="typeALocation">Type In A Location</a>
                  </div>
                </li>
                <form id="geoLocationCoding-Form">
                  <p id="geoLocation-Label">To enable geolocation services, click here -></p>
                  <input type="button" id="geoLocation-submit" />
                  <input type="text" id="geoCoding-input" placeholder="Enter a location & click here ->" />
                  <input type="button" id="geoCoding-submit"/>
                </form>
            </ul>
            </div>
            <div id="main-content">
              <h2>WeatherX UI Working Demo</h2>
              <h3>CSS Template using Grid</h3>
              <p>In this example, we have created a left, a middle and a right.</p>
              <p>This layout is more RWD</p>
              <p>Better than header-middle-footer grid:</p>
              <p>Logo and Title dont change when screen or browser resized</p>
              <p>We will also be testing our 'flat' UX design, using flat icons and flat stlying of menus and buttons</p>
              <p>Featuring a Z-index Logo of +1, and titleBar and main content div</p>
              <p>some Javascript is used to demo a the drop-menu, home/back and form navigation </p>
              <p>A lot of tweeking has been done to get layout, element positioning, etc. to be just right.</p>
              <p> <strong>This is just a layout demo. Now the tough job; to port and implement in ReactJS</strong> </p>
            </div>
          </div>
          <div className="right-margin">
              {/*<img id="RgreyBox" alt=""/>*/}
          </div>
        </div>
    );
  } // end render()

} // end App component

export default MainApp;
