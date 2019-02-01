import React, { Component } from 'react';

export default class MainViewHdr extends Component {
  render(){
    return(
      <div id="mainViewHeader">
        <h3 id="cityName">{this.props.navState.currentLocation.name}</h3>
        <p id="currentConditions">{this.props.navState.currentForecast.data.currently.summary}</p>
        <h1 id="todayTemp">{this.props.navState.currentLocation.temp}</h1>
      </div>
    );
  }
}
