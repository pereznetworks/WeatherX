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

  createGridItem(object, index){
    let currentConditions = this.props.appData.availLocationsArray[index];
    let weatherIcon;
      if ( currentConditions.icon === 'cloudy'  && currentConditions.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-cloudy"></i>

      } else if ( currentConditions.icon === 'cloudy'  && !currentConditions.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-alt-cloudy"></i>

      } else if ( currentConditions.icon === 'fog' && currentConditions.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-fog"></i>

      } else if ( currentConditions.icon === 'fog' && !currentConditions.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-fog"></i>

      } else if ( currentConditions.icon === 'partly-cloudy-day'){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index}  className="wi wi-day-sunny-overcast"></i>

      } else if (currentConditions.icon === 'partly-cloudy-night'  ){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index}  className="wi wi-night-alt-cloudy"></i>

      } else if ( currentConditions.icon === 'rain' && currentConditions.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-rain"></i>

      } else if ( currentConditions.icon === 'rain' && !currentConditions.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-alt-rain"></i>

      } else if ( currentConditions.icon === 'clear-day' && currentConditions.day ){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-sunny"></i>

      } else if ( currentConditions.icon === 'clear' && currentConditions.day ){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-sunny"></i>

      } else if ( currentConditions.icon === 'clear-day' && !currentConditions.day ){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-clear"></i>

      } else if ( currentConditions.icon === 'clear' && !currentConditions.day ){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-clear"></i>

      } else if (currentConditions.icon === 'clear-night'){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-clear"></i>

      } else if ( currentConditions.icon === 'snow' && currentConditions.day ){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-snow"></i>

      }  else if ( currentConditions.icon === 'snow' && !currentConditions.day ){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-alt-snow"></i>

      } else if ( currentConditions.icon === 'scattered-showers' && currentConditions.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-showers"></i>

      }else if ( currentConditions.icon === 'scattered-showers' && !currentConditions.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-alt-showers"></i>

      } else if ( currentConditions.icon === 'thunder' && currentConditions.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-thunderstorm"></i>

      }  else if ( currentConditions.icon === 'thunder' && !currentConditions.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-alt-thunderstorm"></i>

      } else if ( currentConditions.icon === 'wind' && currentConditions.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-day-windy"></i>

      } else if ( currentConditions.icon === 'wind' && !currentConditions.day){
        weatherIcon = <i style={{"fontSize" : "1em"}} key={index} className="wi wi-night-alt-cloudy-gusts"></i>

      }

    return (
      <LocationBarDiv
        navState={this.props.navState}
        appData={this.props.appData}
        key={index}
        indexno={index} value={this.props.appData.locationData[index]}
        showMeThisOne={this.showMeThisOne}
        getCurrentTimeAtLocation={this.props.getCurrentTimeAtLocation}
        getUpToSecDateOfLocation={this.props.getUpToSecDateOfLocation}
        getLiveFormatedTime={this.props.getLiveFormatedTime}
        wi = {weatherIcon}
        />
    );
  }

  displayNewLocFirst(){
    let arrayOfElements = this.props.appData.locationData.map(this.createGridItem);
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
