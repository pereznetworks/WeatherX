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
    let currentConditions = this.props.navState.forecastData[index].data.mostRecentForecast.data.currently;
    let weatherIcon;
      if ( currentConditions.icon === 'cloudy'){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-cloudy"></i>
      } else if ( currentConditions.icon === 'fog'){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-fog"></i>
      } else if ( currentConditions.icon === 'partly-cloudy-day'){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index}  className="wi wi-day-sunny-overcast"></i>
      } else if (currentConditions.icon === 'partly-cloudy-night'  ){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index}  className="wi wi-night-alt-cloudy"></i>
      } else if ( currentConditions.icon === 'rain'){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-rain"></i>
      } else if ( currentConditions.icon === 'clear' ||  currentConditions.icon === 'clear-day'){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-sunny"></i>
      } else if (currentConditions.icon === 'clear-night'){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-clear"></i>
      } else if ( currentConditions.icon === 'snow'){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-snow"></i>
      } else if ( currentConditions.icon === 'scattered-showers'){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-showers"></i>
      } else if ( currentConditions.icon === 'thunder'){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-thunderstorm"></i>
      } else if ( currentConditions.icon === 'wind'){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-windy"></i>
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
