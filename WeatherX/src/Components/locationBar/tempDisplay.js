
import React, { Component } from 'react';

export default class TempDisplay extends Component {

  constructor(props){
    super(props);
    this.tempTypeConversion=this.tempTypeConversion.bind(this);
  }


    tempTypeConversion(tempF, tempNum){
      return this.props.tempTypeConversion(tempF, parseInt(tempNum));
    }

  render(){
      if (this.props.appData.fahrenheitType){
        return (
          <div  id="temp-div" >
            <p className="tempType">{this.props.appData.fahrenheitFont}</p>
            <p  id="currentTemp">{this.props.locationCurrentTemp}</p>
          </div>
        );
     } else {
         let currentTemp = this.tempTypeConversion(this.props.appData.fahrenheitType, this.props.locationCurrentTemp)
         return(
           <div  id="temp-div" >
              <p className="tempType">{this.props.appData.celsiusFont}</p>
              <p  id="currentTemp">{currentTemp}</p>
           </div>
         );
     }
  }
}
