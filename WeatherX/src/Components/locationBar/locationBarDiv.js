
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
          <p  indexno={this.props.indexno} id="locationName">{this.props.value}</p>
        </div>
        <div  id="temp-div" >
          <p  id="currentTemp">61°</p>
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
