
import React, { Component } from 'react';

export default class LocationBarDiv extends Component {

  constructor(props) {
    super(props);
    this.showMeThisOne = this.showMeThisOne.bind(this);
  }

  showMeThisOne(){
    let locationName = this.props.value;
    this.props.showMeThisOne(locationName);
  }
  render(){
    return (
      <div title="locationBar" id="locationBar-div" onClick={this.showMeThisOne}>
        <div  id="cityTime-div">
          <p  id="locationTime">9:00 PM</p>
          <p  indexno={this.props.indexno} className="locationName">{this.props.value}</p>
        </div>
        <div  id="temp-div" >
          <p  id="currentTemp">61°</p>
        </div>
      </div>
    );
  }

}
