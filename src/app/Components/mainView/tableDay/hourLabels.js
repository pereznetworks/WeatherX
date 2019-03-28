import React, { Component } from 'react';

export default class HourLabels extends Component {

  constructor(props){
    super(props);
    this.buildTableHdrs = this.buildTableHdrs.bind(this);
  }

  buildTableHdrs(object, index){
    if (object !== null){
     return <th key={index} className="hourOfDay">{object.hour}</th>;
    }
  }

  render(){
    return this.props.appData.hourlyConditions.map(this.buildTableHdrs)
  }

}
