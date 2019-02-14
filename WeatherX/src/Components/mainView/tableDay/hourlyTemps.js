import React, { Component } from 'react';

export default class HourlyTemps extends Component {

  render(){
      return this.props.appData.hourlyConditions.map((object, index) => {
        if (object !== null){
          return <th key={index} className="hourOfDay">{this.props.appData.hourlyConditions[index].temp}°</th>
        }
      })
  }
}
