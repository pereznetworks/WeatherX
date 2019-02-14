
import React, { Component } from 'react';

export default class TimeDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newTime: this.props.getLiveFormatedTime(new Date(), this.props.appData.forecastData[this.props.indexno].data.offset)
    }
    this.clock = this.clock.bind(this);
  }

  clock(){
    this.setState({
      newTime: this.props.getLiveFormatedTime(new Date(), this.props.appData.forecastData[this.props.indexno].data.offset)
    })
  }

  componentDidMount() {
    this.tickTock = setInterval(this.clock, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.tickTock);
  }

  render(){
    console.log(this.state.newTime)
    return (<p id="locationTime">{this.state.newTime}</p>);

  }
}
