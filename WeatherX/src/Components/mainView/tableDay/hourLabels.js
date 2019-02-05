import React, { Component } from 'react';

export default class HourLabels extends Component {

  constructor(props){
    super(props);
    this.buildTableHdrs = this.buildTableHdrs.bind(this);
  }

  buildTableHdrs = (object, index) =>{
    return <th key={index} className="hourOfDay">{object.hour}</th>;
  }

  render(){
    return this.props.navState.hourlyConditions.map(this.buildTableHdrs)
  }

}
