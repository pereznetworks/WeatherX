import React, { Component } from 'react';

export default class DailyConditions extends Component {

  constructor(props){
    super(props)
    this.selectDailyConditions = this.selectDailyConditions.bind(this);
    this.setDailyConditionElement = this.setDailyConditionElement.bind(this);
  }

  setDailyConditionElement(object, index){
          if (index === this.props.dayIndex){
            if ( object.icon === 'cloudy'){
              return <i title={object.icon} key={index} className="wi wi-day-cloudy"></i>
            } else if ( object.icon === 'fog'){
              return <i title={object.icon} key={index} className="wi wi-day-fog"></i>
            } else if ( object.icon === 'partly-cloudy-day' ||  object.icon === 'partly-cloudy-night'  ){
              return <i title={object.icon} key={index}  className="wi wi-day-sunny-overcast"></i>
            } else if ( object.icon === 'rain'){
              return <i title={object.icon} key={index} className="wi wi-day-rain"></i>
            } else if ( object.icon === 'clear' ||  object.icon === 'clear-night' ||  object.icon === 'clear-day'){
              return <i title={object.icon} key={index} className="wi wi-day-sunny"></i>
            } else if ( object.icon === 'snow'){
              return <i title={object.icon} key={index} className="wi wi-day-snow"></i>
            } else if ( object.icon === 'scattered-showers'){
              return <i title={object.icon} key={index} className="wi wi-day-showers"></i>
            } else if ( object.icon === 'thunder'){
              return <i title={object.icon} key={index} className="wi wi-day-thunderstorm"></i>
            } else if ( object.icon === 'wind'){
              return <i title={object.icon} key={index} className="wi wi-day-windy"></i>
            }
          }
        }

  selectDailyConditions(){
    return this.props.appData.dailyConditions.map(this.setDailyConditionElement)
    }

  render(){
    if (this.props.appData.fahrenheitType){
      return(
        <tr>
          <td id="dayOfWeek">{this.props.appData.dailyConditions[this.props.dayIndex].day}</td>
          <td id="forecastCondition">{this.selectDailyConditions(this.props.dayIndex)}</td>
          <td id="tempHigh">{this.props.appData.dailyConditions[this.props.dayIndex].tempHigh}
              <span id="todayTempType">{this.props.appData.fahrenheitFont}</span>
            </td>
          <td id="tempLow">{this.props.appData.dailyConditions[this.props.dayIndex].tempLow}
              <span id="todayTempType">{this.props.appData.fahrenheitFont}</span>
            </td>
        </tr>
      );
    } else {
      return(
        <tr>
          <td id="dayOfWeek">{this.props.appData.dailyConditions[this.props.dayIndex].day}</td>
          <td id="forecastCondition">{this.selectDailyConditions(this.props.dayIndex)}</td>
          <td id="tempHigh">{this.props.appData.dailyConditions[this.props.dayIndex].tempHigh}
              <span id="todayTempType">{this.props.appData.celsiusFont}</span>
            </td>
          <td id="tempLow">{this.props.appData.dailyConditions[this.props.dayIndex].tempLow}
              <span id="todayTempType">{this.props.appData.celsiusFont}</span>
            </td>
        </tr>
      );
    }
  }
}
