import React, { Component } from 'react';


export default class TableHdr extends Component {
  render(){
    return(
      <table id="tableHdr">
       <tbody>
          <tr>
            <th id="dayOfWeek">Wednesday</th>
            <th id="today">TODAY</th>
            <th id="blank"></th>
            <th id="tempHigh">61°</th>
            <th id="tempLow">44°</th>
          </tr>
        </tbody>
      </table>
    );
  }
}
