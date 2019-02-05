import React, { Component } from 'react';
import HourLabels from './hourLabels.js';
import HourlyConditions from './hourlyConditions.js';
import HourlyTemps from './hourlyTemps.js';

export default class TableDay extends Component {

  constructor(props){
    super(props)
    // this.filterHourlyCondition=this.filterHourlyCondition.bind(this);
  }

  // filterHourlyCondition(){
  //   this.props.filterHourlyCondition()
  // }

  render(){
    return(
      <table id="tableDays">
         <tbody>
              <tr>
                <HourLabels navState={this.props.navState} />
              </tr>
              <tr>
                <HourlyConditions navState={this.props.navState}/>
              </tr>
              <tr>
                <HourlyTemps navState={this.props.navState}/>
              </tr>
          </tbody>
        </table>
    );
  }
}
