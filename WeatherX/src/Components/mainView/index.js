import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';


import './template.css';

export default class MainView extends Component {

  render() {

    if (this.props.navState.mainView){
      return(
        <div id="mainView" title='mainView'>
          <h3 id="cityName">Santa Cruz</h3>
          <p id="currentConditions">Sunny</p>
          <h1 id="currentTemp">61°</h1>
          <table id="tableHdr">
            <tr>
              <th id="dayOfWeek">Wednesday</th>
              <th id="today">TODAY</th>
              <th id="blank"></th>
              <th id="tempHigh">61°</th>
              <th id="tempLow">44°</th>
            </tr>
          </table>
          <table id="tableDays">
            <tr>
              <th>Now</th>
              <th>3 PM</th>
              <th>4 PM</th>
              <th>5 PM</th>
              <th>6 PM</th>
              <th>7 PM</th>
            </tr>
            <tr>
              <td class="Sunny">☀️</td>
              <td class="Sunny">☀️</td>
              <td class="Sunny">☀️</td>
              <td class="Sunny">☀️</td>
              <td class="Sunset">🌅</td>
              <td class="ClearNightSky">🌌</td>
            </tr>
            <tr>
              <td>61°</td>
              <td>62°</td>
              <td>62°</td>
              <td>62°</td>
              <td>62°</td>
              <td>62°</td>
            </tr>
          </table>
          <table id="tableWeek">
            <tr>
              <th id="dayOfWeek"></th>
              <th id="forecastCondition"></th>
              <th id="tempHigh"></th>
              <th id="tempLow"></th>
            </tr>
            <tr>
              <td id="dayOfWeek">Thursday</td>
              <td id="forecastCondition">☀️</td>
              <td id="tempHigh">61°</td>
              <td id="tempLow">44°</td>
            </tr>
            <tr>
              <td id="dayOfWeek">Friday</td>
              <td id="forecastCondition">☀️</td>
              <td id="tempHigh">61°</td>
              <td id="tempLow">44°</td>
            </tr>
            <tr>
              <td id="dayOfWeek">Saturday</td>
              <td id="forecastCondition">☁️</td>
              <td id="tempHigh">61°</td>
              <td id="tempLow">44°</td>
            </tr>
            <tr>
              <td id="dayOfWeek">Sunday</td>
              <td id="forecastCondition">☁️</td>
              <td id="tempHigh">61°</td>
              <td id="tempLow">44°</td>
            </tr>
            <tr>
              <td id="dayOfWeek">Monday</td>
              <td id="forecastCondition">☁️</td>
              <td id="tempHigh">61°</td>
              <td id="tempLow">44°</td>
            </tr>
            <tr>
              <td id="dayOfWeek">Tuesday</td>
              <td id="forecastCondition">⛅️</td>
              <td id="tempHigh">61°</td>
              <td id="tempLow">44°</td>
            </tr>
            <tr>
              <td id="dayOfWeek">Wednesday</td>
              <td id="forecastCondition">☀️</td>
              <td id="tempHigh">61°</td>
              <td id="tempLow">44°</td>
            </tr>
          </table>
        </div>
      );
    } else {
      return null;
    }

  }
}
