
import React, { Component } from 'react';
import ReactMap from "react-mapbox-gl";
// import logo from './logo.svg';
import '../imgs/App.css';
import '../imgs/forecast-grid.css';

class ForecastViewHeader extends Component {
  render() {
    return (
      <header className="header" style={{flex:1}}>
      <a className="App-link" href="/" >Thanks, for using WeatherX
      </a>
      <form className="map-controls">
        <input type='button' value='Street' className="buttonLeft"
        onClick={this.toggleMapStyle}
        ref={(input) => { this.firstInput = input; }} />
        <input type='button' value='Satellite' className="buttonRight"
        onClick={this.toggleMapStyle} />
      </form>
      </header>
    );
  }
}
