import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';
import '../css/App.css';
import '../css/grid-main.css';

class TitleBar extends Component {
  render() {
    return(
      <div id="titleBar">
        <p id="logoBox"></p>
        <p id="title">Welcome to WeatherX</p>
      </div>
    );
  }
}

export default TitleBar
