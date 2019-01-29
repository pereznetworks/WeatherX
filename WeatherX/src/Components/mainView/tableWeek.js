import React, { Component } from 'react';

export default class TableDays extends Component {
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
            <tr>
              <td id="dayOfWeek">Thursday</td>
              <td id="forecastCondition">Clear Skies, Sunny</td>
              <td id="tempHigh">61°</td>
              <td id="tempLow">44°</td>
            </tr>
            <tr>
              <td id="dayOfWeek">Friday</td>
              <td id="forecastCondition">Clear Skies, Sunny</td>
              <td id="tempHigh">61°</td>
              <td id="tempLow">44°</td>
            </tr>
            <tr>
              <td id="dayOfWeek">Saturday</td>
              <td id="forecastCondition">Cloudy</td>
              <td id="tempHigh">61°</td>
              <td id="tempLow">44°</td>
            </tr>
            <tr>
              <td id="dayOfWeek">Sunday</td>
              <td id="forecastCondition">Cloudy</td>
              <td id="tempHigh">61°</td>
              <td id="tempLow">44°</td>
            </tr>
            <tr>
              <td id="dayOfWeek">Monday</td>
              <td id="forecastCondition">Cloudy</td>
              <td id="tempHigh">61°</td>
              <td id="tempLow">44°</td>
            </tr>
            <tr>
              <td id="dayOfWeek">Tuesday</td>
              <td id="forecastCondition">Partly Cloudy</td>
              <td id="tempHigh">61°</td>
              <td id="tempLow">44°</td>
            </tr>
            <tr>
              <td id="dayOfWeek">Wednesday</td>
              <td id="forecastCondition">Clear Skies, Sunny</td>
              <td id="tempHigh">61°</td>
              <td id="tempLow">44°</td>
            </tr>
        </tbody>
      </table>
    );
  }
}
