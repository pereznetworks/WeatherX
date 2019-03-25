import React, { Component } from 'react';

export default class HourlyTemps extends Component {

  render(){
    if (this.props.appData.fahrenheitType){
      return this.props.appData.hourlyConditions.map((object, index) => {
          return <th key={index} className="hourOfDay">{this.props.appData.hourlyConditions[index].temp}
                   <span id="todayTempType">{this.props.appData.fahrenheitFont}</span>
                 </th>
      })
    } else {
      return this.props.appData.hourlyConditions.map((object, index) => {
          return <th key={index} className="hourOfDay">{this.props.appData.hourlyConditions[index].temp}
                   <span id="todayTempType">{this.props.appData.celsiusFont}</span>
                 </th>
      })
    }
  }
}
