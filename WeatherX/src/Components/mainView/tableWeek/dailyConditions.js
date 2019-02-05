import React, { Component } from 'react';

export default class DailyConditions extends Component {

  constructor(props){
    super(props)
    this.selectDailyConditions = this.selectDailyConditions.bind(this);
  }

  selectDailyConditions(){
    return this.props.navState.dailyConditions.map((object, index) => {
            if (index === this.props.dayIndex){
              if ( object.icon === 'cloudy'){
                return <i className="wi wi-day-cloudy"></i>
              } else if ( object.icon === 'fog'){
                return <i className="wi wi-day-fog"></i>
              } else if ( object.icon === 'partly-cloudy-day' ||  object.icon === 'partly-cloudy-night'  ){
                return <i className="wi wi-day-sunny-overcast"></i>
              } else if ( object.icon === 'rain'){
                return <i className="wi wi-day-rain"></i>
              } else if ( object.icon === 'clear' ||  object.icon === 'clear-night' ||  object.icon === 'clear-day'){
                return <i className="wi wi-day-sunny"></i>
              } else if ( object.icon === 'snow'){
                return <i className="wi wi-day-snow"></i>
              } else if ( object.icon === 'scattered-showers'){
                return <i className="wi wi-day-showers"></i>
              } else if ( object.icon === 'thunder'){
                return <i className="wi wi-day-thunderstorm"></i>
              } else if ( object.icon === 'wind'){
                return <i className="wi wi-day-windy"></i>
              }
            }
          })
    }

  render(){
    return(
      <tr>
        <td id="dayOfWeek">{this.props.navState.dailyConditions[this.props.dayIndex].day}</td>
        <td id="forecastCondition">{this.selectDailyConditions(this.props.dayIndex)}</td>
        <td id="tempHigh">{this.props.navState.dailyConditions[this.props.dayIndex].tempHigh}°</td>
        <td id="tempLow">{this.props.navState.dailyConditions[this.props.dayIndex].tempLow}°</td>
      </tr>
    );
  }
}
