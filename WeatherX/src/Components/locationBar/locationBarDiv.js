
import React, { Component } from 'react';

import TempDisplay from "./tempDisplay.js";

export default class LocationBarDiv extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newTime: new Date(),
      locationCurrentTemp: this.props.locationCurrentTemp,
      locationCurrentTime: this.props.locationCurrentTime,
      locationCurrentName: this.props.locationCurrentName
    };
    this.interval = null;
    this.handleNavClick = this.handleNavClick.bind(this);
    this.showMeThisOne = this.showMeThisOne.bind(this);
    this.tempTypeConversion=this.tempTypeConversion.bind(this);
    this.clock=this.clock.bind(this);
  }

  componentDidMount(){
    this.interval = setInterval(this.clock, 1000);
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

  getCurrentTimeAtLocation(timeStamp){
    return this.props.getCurrentTimeAtLocation(timeStamp)
  }

  tempTypeConversion(tempF, tempNum){
    this.props.tempTypeConversion(tempF, tempNum);
  }

  showMeThisOne(event){
    if (event.target.title === 'remove'){
      clearInterval(this.interval);
      this.handleNavClick(event, this.props.indexno);
    } else {
      this.props.showMeThisOne(this.locationCurrentName,this.props.indexno, event);
    }
  }

  handleNavClick(event, index){
    this.props.handleNavClick(event, index);
  }

  render(){
    return (
      <div title="locationBar" className='locationBar-div' indexno={this.props.indexno} onClick={this.showMeThisOne} id={this.props.appData.locationBarBackGround[this.props.indexno]}>
        <div  id="cityTime-div">
          <p id="locationTime">{this.props.getLiveFormatedTime(this.state.newTime, this.props.appData.forecastData[this.props.indexno].data.offset)}</p>
          <p  indexno={this.props.indexno} id="locationName">{`${this.props.appData.locationData[this.props.indexno].data.city}, ${this.props.appData.locationData[this.props.indexno].data.province}`}</p>
        </div>
        <div title="currentConditions" id="locationCondition">{this.props.wi}</div>
        <TempDisplay
           locationCurrentTemp={Math.floor(this.props.appData.forecastData[this.props.indexno].data.currently.temperature)}
           appData={this.props.appData}
           tempTypeConversion={this.props.tempTypeConversion}
          />
        <div key={this.props.indexno} indexno={this.props.indexno} title="remove" className="removeLocation"></div>
      </div>
    );
  }

};
