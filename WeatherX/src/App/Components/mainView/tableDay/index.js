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
                <HourLabels appData={this.props.appData} />
              </tr>
              <tr>
                <HourlyConditions appData={this.props.appData}/>
              </tr>
              <tr>
                <HourlyTemps appData={this.props.appData}/>
              </tr>
          </tbody>
        </table>
    );
  }
}
