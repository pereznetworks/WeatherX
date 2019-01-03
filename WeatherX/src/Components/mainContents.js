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
        <p>
          In this example, we have created a left, a middle and a right.<br />
          Only the middle grid area is used<br />
          This layout is more RWD<br />
          Better than header-middle-footer grid:<br />
          Logo and Title dont change when screen or browser resized<br />
          We will also be testing our 'flat' UX design,<br />
          using flat icons and flat stlying of menus and buttons<br />
          Featuring a Z-index Logo of +1, and titleBar and main content div<br />
          some Javascript is used<br />
          to demo a the drop-menu, home/back and form navigation <br />
          A lot of tweeking has been done... <br />
          to get layout, element positioning, etc. to be just right.<br />
          <br /><strong>This is just a layout demo.<br />
           Now the tough job; to port and implement in ReactJS</strong><br />
        </p>
      </div>
    );
  }
}

export default MainContents;
