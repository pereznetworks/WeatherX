import React, { Component } from 'react';

import LocationBarDiv from "./locationBarDiv.js";

export default class LocationBar extends Component {


  constructor(props) {
    super(props);
    this.createGridItem = this.createGridItem.bind(this);
    this.showMeThisOne = this.showMeThisOne.bind(this);
    this.displayNewLocFirst = this.displayNewLocFirst.bind(this);
  }

  showMeThisOne(locationName, index){
    this.props.showMeThisOne(locationName, index);
  }

  createGridItem(value, index){
    let currentConditions = this.props.navState.locationsArray[index];
    let weatherIcon;
      if ( currentConditions.icon === 'cloudy'  && this.props.navState.currentLocation.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-cloudy"></i>

      } else if ( currentConditions.icon === 'cloudy'  && !this.props.navState.currentLocation.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-alt-cloudy"></i>

      } else if ( currentConditions.icon === 'fog' && this.props.navState.currentLocation.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-fog"></i>

      } else if ( currentConditions.icon === 'fog' && !this.props.navState.currentLocation.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-fog"></i>

      } else if ( currentConditions.icon === 'partly-cloudy-day'){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index}  className="wi wi-day-sunny-overcast"></i>

      } else if (currentConditions.icon === 'partly-cloudy-night'  ){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index}  className="wi wi-night-alt-cloudy"></i>

      } else if ( currentConditions.icon === 'rain' && this.props.navState.currentLocation.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-rain"></i>

      } else if ( currentConditions.icon === 'rain' && !this.props.navState.currentLocation.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-alt-rain"></i>

      } else if ( currentConditions.icon === 'clear-day' && this.props.navState.currentLocation.day ){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-sunny"></i>

      } else if ( currentConditions.icon === 'clear' && this.props.navState.currentLocation.day ){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-sunny"></i>

      } else if ( currentConditions.icon === 'clear-day' && !this.props.navState.currentLocation.day ){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-clear"></i>

      } else if ( currentConditions.icon === 'clear' && !this.props.navState.currentLocation.day ){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-clear"></i>

      } else if (currentConditions.icon === 'clear-night'){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-clear"></i>

      } else if ( currentConditions.icon === 'snow' && this.props.navState.currentLocation.day ){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-snow"></i>

      }  else if ( currentConditions.icon === 'snow' && !this.props.navState.currentLocation.day ){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-alt-snow"></i>

      } else if ( currentConditions.icon === 'scattered-showers' && this.props.navState.currentLocation.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-showers"></i>

      }else if ( currentConditions.icon === 'scattered-showers' && !this.props.navState.currentLocation.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-alt-showers"></i>

      } else if ( currentConditions.icon === 'thunder' && this.props.navState.currentLocation.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-thunderstorm"></i>

      }  else if ( currentConditions.icon === 'thunder' && !this.props.navState.currentLocation.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-alt-thunderstorm"></i>

      } else if ( currentConditions.icon === 'wind' && this.props.navState.currentLocation.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-windy"></i>

      } else if ( currentConditions.icon === 'wind' && !this.props.navState.currentLocation.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-alt-cloudy-gusts"></i>

      }

    return (
      <LocationBarDiv
        navState={this.props.navState}
        key={index}
        indexno={index} value={this.props.navState.locationName[index]}
        showMeThisOne={this.showMeThisOne}
        getCurrentTimeAtLocation={this.props.getCurrentTimeAtLocation}
        wi = {weatherIcon}
        />
    );
  }

  displayNewLocFirst(){
    let arrayOfElements = this.props.navState.locationName.map(this.createGridItem);
    arrayOfElements.reverse();
    return arrayOfElements;
  }

  render() {
    if (this.props.navState.locationBar){
        return (
          <div className='middle-grid-item-2'>{this.displayNewLocFirst()}</div>
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
