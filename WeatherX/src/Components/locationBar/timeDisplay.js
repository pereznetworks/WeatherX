
import React, { Component } from 'react';

export default class TimeDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newTime: this.props.getLiveFormatedTime(new Date(), this.props.appData.forecastData[this.props.indexno].data.offset),
      secs: 0
    }
    this.clock = this.clock.bind(this);
    this.tickTock = this.tickTock.bind(this);
  }

  clock(){
    this.setState({
      newTime: this.props.getLiveFormatedTime(new Date(), this.props.appData.forecastData[this.props.indexno].data.offset),
      secs: this.state.secs + 1,
      qtrHr: this.state.secs === 900000
    });
  }

  tickTock(){
    this.clock();
  }

  componentDidMount() {
    this.interval = setInterval(this.tickTock, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render(){
    return (<p id="locationTime">{this.state.newTime}</p>);
  }

}
