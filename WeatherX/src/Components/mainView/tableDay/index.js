import React, { Component } from 'react';
import Hourly from './hourly.js';

export default class TableDay extends Component {

  render(){
    return(
      <table id="tableDays">
         <tbody>
              <tr>
                <th className="hourOfDay">Now</th>
                <th className="hourOfDay">{this.props.navState.hourlyConditions[1].hour}</th>
                <th className="hourOfDay">{this.props.navState.hourlyConditions[2].hour}</th>
                <th className="hourOfDay">{this.props.navState.hourlyConditions[3].hour}</th>
                <th className="hourOfDay">{this.props.navState.hourlyConditions[4].hour}</th>
                <th className="hourOfDay">{this.props.navState.hourlyConditions[5].hour}</th>
                <th className="hourOfDay">{this.props.navState.hourlyConditions[6].hour}</th>
                <th className="hourOfDay">{this.props.navState.hourlyConditions[7].hour}</th>
              </tr>
              <tr>
                <Hourly iconKeyWord={this.props.navState.hourlyConditions[0].icon}/>
                <Hourly iconKeyWord={this.props.navState.hourlyConditions[1].icon}/>
                <Hourly iconKeyWord={this.props.navState.hourlyConditions[2].icon}/>
                <Hourly iconKeyWord={this.props.navState.hourlyConditions[3].icon}/>
                <Hourly iconKeyWord={this.props.navState.hourlyConditions[4].icon}/>
                <Hourly iconKeyWord={this.props.navState.hourlyConditions[5].icon}/>
                <Hourly iconKeyWord={this.props.navState.hourlyConditions[6].icon}/>
                <Hourly iconKeyWord={this.props.navState.hourlyConditions[7].icon}/>
              </tr>
              <tr>
                <td className="hourlyTemp">{this.props.navState.hourlyConditions[0].temp}°</td>
                <td className="hourlyTemp">{this.props.navState.hourlyConditions[1].temp}°</td>
                <td className="hourlyTemp">{this.props.navState.hourlyConditions[2].temp}°</td>
                <td className="hourlyTemp">{this.props.navState.hourlyConditions[3].temp}°</td>
                <td className="hourlyTemp">{this.props.navState.hourlyConditions[4].temp}°</td>
                <td className="hourlyTemp">{this.props.navState.hourlyConditions[5].temp}°</td>
                <td className="hourlyTemp">{this.props.navState.hourlyConditions[6].temp}°</td>
                <td className="hourlyTemp">{this.props.navState.hourlyConditions[7].temp}°</td>
              </tr>
          </tbody>
        </table>
    );
  }
}
