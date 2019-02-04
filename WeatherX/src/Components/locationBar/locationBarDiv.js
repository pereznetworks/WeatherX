
import React, { Component } from 'react';

export default class LocationBarDiv extends Component {

  constructor(props) {
    super(props);

    this.locationCurrentTemp = Math.floor(this.props.navState.forecastData[this.props.indexno].data.currently.temperature);
    this.locationCurrentTime = this.props.getCurrentTimeAtLocation(this.props.navState.forecastData[this.props.indexno].data.currently.time);
    this.locationCurrentName = this.props.navState.locationName[this.props.indexno];

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
      <div title="locationBar" id="locationBar-div" onClick={this.showMeThisOne}>
        <div  id="cityTime-div">
          <p  id="locationTime">{this.locationCurrentTime}</p>
          <p  indexno={this.props.indexno} id="locationName">{this.locationCurrentName}</p>
        </div>
        <div  id="temp-div" >
          <p  id="currentTemp">{this.locationCurrentTemp}°</p>
        </div>
      </div>
    );
  }

}

// this.state = {
//   gridItemClassNameArray: ['.middle-grid-item-0', '.middle-grid-item-1', '.middle-grid-item-2', '.middle-grid-item-3', '.middle-grid-item-4','.middle-grid-item-5', '.middle-grid-item-6', '.middle-grid-item-7', '.middle-grid-item-8', '.middle-grid-item-9' ],
// };
//
// this.reduceGridItemClassNames = this.reduceGridItemClassNames.bind(this);
//
// reduceGridItemClassNames(value, index){
//     if ((index + 2 )=== this.props.indexno){
//       return value;
//     }
//   }
