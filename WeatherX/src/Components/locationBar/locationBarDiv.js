
import React, { Component } from 'react';

import TempDisplay from "./tempDisplay.js";

export default class LocationBarDiv extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newTime: new Date()
    };
    this.removeMe= false;
    this.interval = null;
    this.locationCurrentTemp = Math.floor(this.props.appData.forecastData[this.props.indexno].data.currently.temperature);
    this.locationCurrentTime = this.props.getCurrentTimeAtLocation(this.props.appData.forecastData[this.props.indexno].data.currently.time, this.props.appData.forecastData[this.props.indexno].data.offset);
    this.locationCurrentName = `${this.props.appData.locationData[this.props.indexno].data.city}, ${this.props.appData.locationData[this.props.indexno].data.province}`;
    this.showMeThisOne = this.showMeThisOne.bind(this);
    this.tempTypeConversion=this.tempTypeConversion.bind(this);
    this.removeLocation=this.removeLocation.bind(this);
    this.clock=this.clock.bind(this);
  }

  componentDidMount(){
    this.interval = setInterval(this.clock, 1000)
  }

  componentWillUnmount(){
    clearInterval(this.interval)
  }

  clock(){
    this.setState({
      newTime: new Date()
    })
    console.log(this.state.newTime);
  }

  showMeThisOne(event){
    if (event.target.title === 'remove'){
      clearInterval(this.interval)
    }
    this.props.showMeThisOne(this.locationCurrentName,this.props.indexno, event);
  }

  getCurrentTimeAtLocation(timeStamp){
    return this.props.getCurrentTimeAtLocation(timeStamp)
  }

  tempTypeConversion(tempF, tempNum){
    this.props.tempTypeConversion(tempF, tempNum);
  }

  removeLocation(event, indexno){
    this.props.removeLocation(event, indexno);
  }

  render(){
    return (
      <div title="locationBar" className="locationBar-div" indexno={this.props.indexno} onClick={this.showMeThisOne} id={this.props.appData.locationBarBackGround[this.props.indexno]}>
        <div  id="cityTime-div">
          <p id="locationTime">{this.props.getLiveFormatedTime(this.state.newTime, this.props.appData.forecastData[this.props.indexno].data.offset)}</p>
          <p  indexno={this.props.indexno} id="locationName">{this.locationCurrentName}</p>
        </div>
        <div title="currentConditions" id="locationCondition">{this.props.wi}</div>
        <TempDisplay
           locationCurrentTemp = {this.locationCurrentTemp}
           appData = {this.props.appData}
           tempTypeConversion={this.props.tempTypeConversion}
          />
        <div
          title="remove"
          className="removeLocation"></div>
      </div>
    );
  }

};
