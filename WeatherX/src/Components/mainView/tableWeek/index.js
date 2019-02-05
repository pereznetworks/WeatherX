import React, { Component } from 'react';
import DailyConditions from './dailyConditions.js'

export default class TableWeek extends Component {
  render(){
    return(
      <table id="tableWeek">
         <tbody>
            <tr>
              <th id="dayOfWeek"></th>
              <th id="forecastCondition"></th>
              <th id="tempHigh"></th>
              <th id="tempLow"></th>
            </tr>
            <DailyConditions navState={this.props.navState} dayIndex={0}/>
            <DailyConditions navState={this.props.navState} dayIndex={1}/>
            <DailyConditions navState={this.props.navState} dayIndex={2}/>
            <DailyConditions navState={this.props.navState} dayIndex={3}/>
            <DailyConditions navState={this.props.navState} dayIndex={4}/>
            <DailyConditions navState={this.props.navState} dayIndex={5}/>
            <DailyConditions navState={this.props.navState} dayIndex={6}/>
            <DailyConditions navState={this.props.navState} dayIndex={7}/>
        </tbody>
      </table>
    );
  }
}
