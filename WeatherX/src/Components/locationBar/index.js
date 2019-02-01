import React, { Component } from 'react';

import LocationBarDiv from "./locationBarDiv.js";

export default class LocationBar extends Component {


  constructor(props) {
    super(props);
    this.createGridItem = this.createGridItem.bind(this);
    this.showMeThisOne = this.showMeThisOne.bind(this);
  }

  showMeThisOne(locationName, index){
    this.props.showMeThisOne(locationName, index);
  }

  createGridItem(value, index){
    return (
      <LocationBarDiv
        navState={this.props.navState}
        key={index}
        indexno={index} value={this.props.navState.locationName[index]}
        showMeThisOne={this.showMeThisOne}
        getCurrentTimeAtLocation={this.props.getCurrentTimeAtLocation}
        />
    );
  }


  render() {
    if (this.props.navState.locationBar){
        return (
          <div className='middle-grid-item-2'>{this.props.navState.locationName.map(this.createGridItem)}</div>
        );
      } else {
        return null;
      }
  }
}

/*
<div title="locationBar" id="locationBar-div" onClick={this.props.handleNavClick}>
  <div title="locationBar" id="cityTime-div" onClick={this.props.handleNavClick}>
    <p title="locationBar" id="locationTime" onClick={this.props.handleNavClick}>9:00 PM</p>
    <p title="locationBar" id="locationName" onClick={this.props.handleNavClick}>{this.props.navState.currentLocation}</p>
  </div>
  <div title="locationBar" id="temp-div" onClick={this.props.handleNavClick}>
    <p  title="locationBar" id="currentTemp" onClick={this.props.handleNavClick}>61°</p>
  </div>
</div>

 */
