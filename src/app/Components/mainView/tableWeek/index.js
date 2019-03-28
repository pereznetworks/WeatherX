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
            <DailyConditions key={0} appData={this.props.appData} dayIndex={0}/>
            <DailyConditions key={1} appData={this.props.appData} dayIndex={1}/>
            <DailyConditions key={2} appData={this.props.appData} dayIndex={2}/>
            <DailyConditions key={3} appData={this.props.appData} dayIndex={3}/>
            <DailyConditions key={4} appData={this.props.appData} dayIndex={4}/>
            <DailyConditions key={5} appData={this.props.appData} dayIndex={5}/>
            <DailyConditions key={6} appData={this.props.appData} dayIndex={6}/>
            <DailyConditions key={7} appData={this.props.appData} dayIndex={7}/>
        </tbody>
      </table>
    );
  }
}
