import React, { Component } from 'react';

export default class MainViewHdr extends Component {
  render(){
    if (this.props.appData.fahrenheitType){
      return(
        <div id="mainViewHeader">
          <h3 id="cityName">{this.props.appData.currentLocationData.name}</h3>
          <p id="currentConditions">{this.props.appData.currentForecast.currently.summary}</p>
          <h1 id="todayTemp">{this.props.appData.currentLocationData.temp}
            <span id="todayTempType">{this.props.appData.fahrenheitFont}</span>
            </h1>
        </div>
      );
    } else {
      return(
        <div id="mainViewHeader">
          <h3 id="cityName">{this.props.appData.currentLocationData.name}</h3>
          <p id="currentConditions">{this.props.appData.currentForecast.currently.summary}</p>
          <h1 id="todayTemp">{this.props.appData.currentLocationData.temp}
            <span  id="todayTempType">{this.props.appData.celsiusFont}</span>
            </h1>
        </div>
      );
    }
  }
}
