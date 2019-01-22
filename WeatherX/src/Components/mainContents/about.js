import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';

export default class About extends Component {
  render() {
    return(
            <div className="about-button-div">
              <input
                type="button"
                className="about-button"
                id="about-Submit"
                title="About WeatherX"
                onClick={this.props.handleNavSubmit}/>
              <label className="about-button-label" id="about-Button-Label">
               About WeatherX
              </label>
            </div>
    );
  }
}
