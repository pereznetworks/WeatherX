
import React, { Component } from 'react';

export default class TimeDisplay extends Component {

    render(){
      return (<p id="locationTime">{this.props.getLiveFormatedTime(this.props.newTime, this.props.appData.forecastData[this.props.indexno].data.offset)}</p>);
    }

}
