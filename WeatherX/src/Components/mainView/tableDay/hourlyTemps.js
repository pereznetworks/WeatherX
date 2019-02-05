import React, { Component } from 'react';

export default class HourlyTemps extends Component {

  render(){
      return this.props.navState.hourlyConditions.map((object, index) => {
          return <th key={index} className="hourOfDay">{this.props.navState.hourlyConditions[index].temp}°</th>
      })
  }
}
