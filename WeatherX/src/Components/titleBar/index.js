import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';

// import '../css/grid-main2.css';

export default class TitleBar extends Component {
  render() {
    return (
      <div id="titleBar" className='middle-grid-item-0'>
        <a id="title" href="https://pereznetworks.github.io/TD-Project12/">WeatherX</a>
        <a id="titleText" href="https://pereznetworks.github.io/TD-Project12/">About WeatherX</a>
        <a className="attribLink" href="https://teamtreehouse.com">Thanks to: Team Treehouse, </a>
        <a className="attribLink" href="https://developer.tomtom.com/tomtom-maps-apis-developers">Tom Tom</a>
        <a className="attribLink" href="https://darksky.net/dev">and Dark Sky</a>
      </div>
    )
  }
}
