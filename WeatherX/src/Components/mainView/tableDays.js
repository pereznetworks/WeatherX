import React, { Component } from 'react';

export default class TableDays extends Component {
  render(){
    return(
      <table id="tableDays">
         <tbody>
              <tr>
                <th>Now</th>
                <th>3 PM</th>
                <th>4 PM</th>
                <th>5 PM</th>
                <th>6 PM</th>
                <th>7 PM</th>
              </tr>
              <tr>
                <td className="Sunny">Clear Skies, Sunny</td>
                <td className="Sunny">Clear Skies, Sunny</td>
                <td className="Sunny">Clear Skies, Sunny</td>
                <td className="Sunny">Clear Skies, Sunny</td>
                <td className="Sunset">Clear Skies, Sunset</td>
                <td className="ClearNightSky">Clear Night</td>
              </tr>
              <tr>
                <td>61°</td>
                <td>62°</td>
                <td>62°</td>
                <td>62°</td>
                <td>62°</td>
                <td>62°</td>
              </tr>
          </tbody>
        </table>
    );
  }
}
