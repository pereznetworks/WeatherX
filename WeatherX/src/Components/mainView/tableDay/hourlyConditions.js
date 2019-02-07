import React, { Component } from 'react';

export default class HourlyConditions extends Component {

  constructor(props){
    super(props)
    this.selectHourlyConditions = this.selectHourlyConditions.bind(this);
    this.setHourlyConditionElements = this.setHourlyConditionElements.bind(this);
  }

  setHourlyConditionElements(object, index){
      if (object.icon === 'cloudy'){
        return <td key={index} className="weatherSummary" ><i className="wi wi-day-cloudy"></i></td>
      } else if (object.icon === 'fog'){
        return <td key={index} className="weatherSummary" ><i className="wi wi-day-fog"></i></td>
      } else if (object.icon === 'partly-cloudy-day' || object.icon === 'partly-cloudy-night'  ){
        return <td key={index} className="weatherSummary" ><i className="wi wi-day-sunny-overcast"></i></td>
      } else if (object.icon === 'rain'){
        return <td key={index} className="weatherSummary"><i className="wi wi-day-rain"></i></td>
      } else if (object.icon === 'clear' || object.icon === 'clear-night' || object.icon === 'clear-day'){
        return <td key={index} className="weatherSummary"><i className="wi wi-day-sunny"></i></td>
      } else if (object.icon === 'snow'){
        return <td key={index} className="weatherSummary"><i className="wi wi-day-snow"></i></td>
      } else if (object.icon === 'scattered-showers'){
        return <td key={index} className="weatherSummary"><i className="wi wi-day-showers"></i></td>
      } else if (object.icon === 'thunder'){
        return <td key={index} className="weatherSummary"><i className="wi wi-day-thunderstorm"></i></td>
      } else if (object.icon === 'wind'){
        return <td key={index} className="weatherSummary" ><i className="wi wi-day-windy"></i></td>
      }
  }

  selectHourlyConditions(){
    return this.props.navState.hourlyConditions.map(this.setHourlyConditionElements);
  }

  render(){
      return this.selectHourlyConditions();
  }
}
