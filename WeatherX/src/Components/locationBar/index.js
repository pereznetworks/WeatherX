import React, { Component } from 'react';

import './locationBar.css';

export default class LocationBar extends Component {


  render() {
    if (this.props.navState.locationBar){
        return (
          <div title="locationBar" id="locationBar-div" onClick={this.props.handleNavClick}>
            <div title="locationBar" id="cityTime-div" onClick={this.props.handleNavClick}>
              <p title="locationBar" id="locationTime" onClick={this.props.handleNavClick}>9:00 PM</p>
              <p title="locationBar" id="cityName" onClick={this.props.handleNavClick}>Santa Cruz</p>
            </div>
            <div title="locationBar" id="temp-div" onClick={this.props.handleNavClick}>
              <p  title="locationBar" id="currentTemp" onClick={this.props.handleNavClick}>61°</p>
            </div>
          </div>
        );
      } else {
        return null;
      }
  }
}
