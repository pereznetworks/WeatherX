import React, { Component } from 'react';

import './locationBar.css';

export default class LocationBar extends Component {


  render() {
    if (this.props.navState.locationBar){
        return (
          <div title="locationBar" id="locationBar-div">
            <div id="cityTime-div">
              <p id="locationTime">9:00 PM</p>
              <p id="cityName">Santa Cruz</p>
            </div>
            <div id="temp-div">
              <p id="currentTemp">61°</p>
            </div>
          </div>
        );
      } else {
        return null;
      }
  }
}
