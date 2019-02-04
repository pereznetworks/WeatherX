import React, { Component } from 'react';

export default class Hourly extends Component {

  render(){
      if (this.props.iconKeyWord === 'cloud'){
        return <td className="weatherSummary"><i className="wi wi-day-cloudy"></i></td>;
      } else if (this.props.iconKeyWord === 'fog'){
        return <td className="weatherSummary"><i className="wi wi-day-fog"></i></td>;
      } else if (this.props.iconKeyWord === 'hurricane'){
        return <td className="weatherSummary" id='hurricane'></td>;
      } else if (this.props.iconKeyWord === 'partly-cloudy-day' || this.props.iconKeyWord === 'partly-cloudy-night'  ){
        return <td className="weatherSummary"><i className="wi wi-day-sunny-overcast"></i></td>;
      } else if (this.props.iconKeyWord === 'rain'){
        return <td className="weatherSummary" id='rain'><i className="wi wi-day-rain"></i></td>
      } else if (this.props.iconKeyWord === 'sun'){
        return <td className="weatherSummary" id='sun'><i className="wi wi-day-sunny"></i></td>
      } else if (this.props.iconKeyWord === 'snow'){
        return <td className="weatherSummary" id='snow'><i className="wi wi-day-snow"></i></td>
      } else if (this.props.iconKeyWord === 'scattered-showers'){
        return <td className="weatherSummary" id='scatteredShowers'><i className="wi wi-day-showers"></i></td>
      } else if (this.props.iconKeyWord === 'thunder'){
        return <td className="weatherSummary" id='thunder'><i className="wi wi-day-thunderstorm"></i></td>
      } else if (this.props.iconKeyWord === 'wind'){
        return <td className="weatherSummary"><i className="wi wi-day-windy"></i></td>
      }
  }
}
