import React, { Component } from 'react';

export default class HourlyConditions extends Component {

  constructor(props){
    super(props)
    this.selectHourlyConditions = this.selectHourlyConditions.bind(this);
    this.setHourlyConditionElements = this.setHourlyConditionElements.bind(this);
  }

  setHourlyConditionElements(object, index){
        if (object.icon === 'cloudy' && object.day){
          return <td key={index} className="weatherSummary" ><i className="wi wi-day-cloudy"></i></td>
        } else if (object.icon === 'cloudy' && !object.day){
          return <td key={index} className="weatherSummary" ><i className="wi wi-night-alt-cloudy"></i></td>
        } else if (object.icon === 'fog' && object.day){
          return <td key={index} className="weatherSummary" ><i className="wi wi-day-fog"></i></td>
        } else if (object.icon === 'fog' && !object.day){
          return <td key={index} className="weatherSummary" ><i className="wi wi-night-fog"></i></td>
        } else if (object.icon === 'partly-cloudy-day' && object.day){
          return <td key={index} className="weatherSummary" ><i className="wi wi-day-sunny-overcast"></i></td>
        } else if ( object.icon === 'partly-cloudy-night' && !object.day ){
          return <td key={index} className="weatherSummary" ><i className="wi wi-night-alt-cloudy"></i></td>
        } else if (object.icon === 'rain' && object.day){
          return <td key={index} className="weatherSummary"><i className="wi wi-day-rain"></i></td>
        } else if (object.icon === 'rain' && !object.day){
          return <td key={index} className="weatherSummary"><i className="wi wi-night-alt-rain"></i></td>
        } else if (object.icon === 'clear' && object.day){
          return <td key={index} className="weatherSummary"><i className="wi wi-day-sunny"></i></td>
        } else if ( object.icon === 'clear-day' && object.day){
          return <td key={index} className="weatherSummary"><i className="wi wi-day-sunny"></i></td>
        } else if ( object.icon === 'clear-night' && !object.day){
          return <td key={index} className="weatherSummary"><i className="wi wi-night-clear"></i></td>
        } else if (object.icon === 'snow' && object.day){
          return <td key={index} className="weatherSummary"><i className="wi wi-day-snow"></i></td>
        } else if (object.icon === 'snow' && !object.day){
          return <td key={index} className="weatherSummary"><i className="wi wi-night-alt-snow"></i></td>
        } else if (object.icon === 'scattered-showers' && object.day){
          return <td key={index} className="weatherSummary"><i className="wi wi-day-showers"></i></td>
        } else if (object.icon === 'scattered-showers' && !object.day){
          return <td key={index} className="weatherSummary"><i className="wi wi-night-alt-showers"></i></td>
        } else if (object.icon === 'thunder' && object.day){
          return <td key={index} className="weatherSummary"><i className="wi wi-day-thunderstorm"></i></td>
        } else if (object.icon === 'thunder' && !object.day){
          return <td key={index} className="weatherSummary"><i className="wi wi-night-alt-thunderstorm"></i></td>
        } else if (object.icon === 'wind' && object.day){
          return <td key={index} className="weatherSummary" ><i className="wi wi-day-windy"></i></td>
        } else if (object.icon === 'wind' && !object.day){
          return <td key={index} className="weatherSummary" ><i className="wi wi-night-alt-cloudy-gusts"></i></td>
        }

  }

  selectHourlyConditions(){
    return this.props.appData.hourlyConditions.map(this.setHourlyConditionElements);
  }

  render(){
      return this.selectHourlyConditions();
  }
}
