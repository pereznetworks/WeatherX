import React, { Component } from 'react';

export default class MainViewHdr extends Component {
  render(){
    return(
      <div id="mainViewHeader">
        <h3 id="cityName">{this.props.navState.currentLocation}</h3>
        <p id="currentConditions">Sunny</p>
        <h1 id="todayTemp">61°</h1>
      </div>
    );
  }
}
