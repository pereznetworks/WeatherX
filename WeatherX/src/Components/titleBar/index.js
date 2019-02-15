import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';

// import '../css/grid-main2.css';

export default class TitleBar extends Component {
  render() {
    return (
      <div id="titleBar" className='middle-grid-item-0'>
        <a id="title" href="file:///Users/danielperez/Dropbox/TechDegree/TD-Project12/capstone/index.html">WeatherX</a>
        <a id="titleText" href="file:///Users/danielperez/Dropbox/TechDegree/TD-Project12/capstone/index.html">A Weather Forecast Service</a>
      </div>
    )
  }
}
