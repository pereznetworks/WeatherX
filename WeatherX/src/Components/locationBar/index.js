import React, { Component } from 'react';

import '../../css/locationBar.css';

export default class LocationBar extends Component {


  render() {
    if (this.props.navState.locationBar){
        return (
          <div title="locationBar" id="locationBar-div" onClick={this.props.handleNavClick}>
            <div title="locationBar" id="cityTime-div" onClick={this.props.handleNavClick}>
              <p title="locationBar" id="locationTime" onClick={this.props.handleNavClick}>9:00 PM</p>
              <p title="locationBar" id="locationName" onClick={this.props.handleNavClick}>{this.props.navState.locationName[0]}</p>
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
