
import React, { Component } from 'react';

import TimeDisplay from "./timeDisplay.js";

export default class LocationBarDiv extends Component {

  constructor(props) {
    super(props);

    this.locationCurrentTemp = Math.floor(this.props.appData.forecastData[this.props.indexno].data.currently.temperature);
    this.locationCurrentTime = this.props.getCurrentTimeAtLocation(this.props.appData.forecastData[this.props.indexno].data.currently.time, this.props.appData.forecastData[this.props.indexno].data.offset);
    this.locationCurrentName = `${this.props.appData.locationData[this.props.indexno].data.city}, ${this.props.appData.locationData[this.props.indexno].data.province}`;

    this.showMeThisOne = this.showMeThisOne.bind(this);
  }
  showMeThisOne(){
    this.props.showMeThisOne(this.locationCurrentName,this.props.indexno);
  }

  getCurrentTimeAtLocation(timeStamp){
    return this.props.getCurrentTimeAtLocation(timeStamp)
  }

  render(){
    return (
      <div title="locationBar" className="locationBar-div" onClick={this.showMeThisOne} id={this.props.appData.locationBarBackGround[this.props.indexno]}>
        <div  id="cityTime-div">
          <TimeDisplay        
            getLiveFormatedTime={this.props.getLiveFormatedTime}
            appData={this.props.appData}
            indexno={this.props.indexno}
          />
          <p  indexno={this.props.indexno} id="locationName">{this.locationCurrentName}</p>
        </div>
        <div title="currentConditions" id="locationCondition">{this.props.wi}</div>
        <div  id="temp-div" >
          <p  id="currentTemp">{this.locationCurrentTemp}°</p>
        </div>
      </div>
    );
  }

}

/*

colors = clear night sky = #040429

<TimeDisplay
  getCurrentTimeAtLocation={this.props.getCurrentTimeAtLocation}
  appData={this.props.appData}
  indexno={this.props.indexno}
/>
*/
