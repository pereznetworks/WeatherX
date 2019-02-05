import React, { Component } from 'react';
import HourLabels from './hourLabels.js';
import HourlyConditions from './hourlyConditions.js';
import HourlyTemps from './hourlyTemps.js';

export default class TableDay extends Component {

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
