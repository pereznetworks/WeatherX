import React, { Component } from 'react';

export default class MainViewHdr extends Component {
  render(){
    return(
      <div id="mainViewHeader">
        <h3 id="cityName">{this.props.appData.currentLocationData.name}</h3>
        <p id="currentConditions">{this.props.appData.currentForecast.currently.summary}</p>
        <h1 id="todayTemp">{this.props.appData.currentLocationData.temp}°</h1>
      </div>
    );
  }
}
