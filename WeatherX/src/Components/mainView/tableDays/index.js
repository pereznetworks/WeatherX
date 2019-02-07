import React, { Component } from 'react';

export default class TableDays extends Component {

  constructor(props) {
    super(props);
    this.hourlyConditions = this.getHourlyConditions.bind(this);
  }

  getHourlyConditions(){
    this.props.getHourlyConditions(this.props.navState.forecastData[this.props.navState.currentLocation.index].data.daily.data);
  }

  render(){
    return(
      <table id="tableDays">
         <tbody>
              <tr>
                <th className="hourOfDay">Now</th>
                <th className="hourOfDay">{this.hourlyConditions[1].hour}</th>
                <th className="hourOfDay">{this.hourlyConditions[2].hour}</th>
                <th className="hourOfDay">{this.hourlyConditions[3].hour}</th>
                <th className="hourOfDay">{this.hourlyConditions[4].hour}</th>
                <th className="hourOfDay">{this.hourlyConditions[5].hour}</th>
                <th className="hourOfDay">{this.hourlyConditions[6].hour}</th>
                <th className="hourOfDay">{this.hourlyConditions[7].hour}</th>
              </tr>
              <tr>
                <td className="weatherSummary"></td>
                <td className="weatherSummary"></td>
                <td className="weatherSummary"></td>
                <td className="weatherSummary"></td>
                <td className="weatherSummary"></td>
                <td className="weatherSummary"></td>
                <td className="weatherSummary"></td>
                <td className="weatherSummary"></td>
              </tr>
              <tr>
                <td className="hourlyTemp">{this.hourlyConditions[0].temp}°</td>
                <td className="hourlyTemp">{this.hourlyConditions[1].temp}°</td>
                <td className="hourlyTemp">{this.hourlyConditions[2].temp}°</td>
                <td className="hourlyTemp">{this.hourlyConditions[3].temp}°</td>
                <td className="hourlyTemp">{this.hourlyConditions[4].temp}°</td>
                <td className="hourlyTemp">{this.hourlyConditions[5].temp}°</td>
                <td className="hourlyTemp">{this.hourlyConditions[6].temp}°</td>
                <td className="hourlyTemp">{this.hourlyConditions[7].temp}°</td>
              </tr>
          </tbody>
        </table>
    );
  }
}
