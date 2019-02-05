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
            <DailyConditions key={0} navState={this.props.navState} dayIndex={0}/>
            <DailyConditions key={1} navState={this.props.navState} dayIndex={1}/>
            <DailyConditions key={2} navState={this.props.navState} dayIndex={2}/>
            <DailyConditions key={3} navState={this.props.navState} dayIndex={3}/>
            <DailyConditions key={4} navState={this.props.navState} dayIndex={4}/>
            <DailyConditions key={5} navState={this.props.navState} dayIndex={5}/>
            <DailyConditions key={6} navState={this.props.navState} dayIndex={6}/>
            <DailyConditions key={7} navState={this.props.navState} dayIndex={7}/>
        </tbody>
      </table>
    );
  }
}
