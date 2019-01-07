// react components

import React, { Component } from 'react';

// css styling
import '../../css/App.css';
import '../../css/grid-main.css';

class DropDownNav extends Component {
  render() {
    return(
          <li className="dropdown" id="dropDownNav" style={this.props.navState.dropDownDisplayAttr}>
            <a href="#Main" className="dropbtn">Get Weather Forecast</a>
            <div className="dropdown-content">
              <a href="#Main" id="useMyLocation">Use My Location</a>
              <a href="#Main" id="typeALocation">Type In A Location</a>
            </div>
          </li>
        );
  }
} // this component will be passe props.textContent

export default DropDownNav;
