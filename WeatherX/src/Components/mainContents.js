import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';
import '../css/App.css';
import '../css/grid-main.css';

class MainContents extends Component {
  render() {
    return(
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
    );
  }
}

export default MainContents;
