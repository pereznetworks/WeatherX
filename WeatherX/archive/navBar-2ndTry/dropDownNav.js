// react components

import React, { Component } from 'react';

// css styling
import '../../css/App.css';
import '../../css/grid-main2.css';

export default class DropDownNav extends Component {

  constructor(props) {
    super(props);
    this.handleNavClick = this.handleNavClick.bind(this);
  }

  handleNavClick(e){
    this.props.handleNavClick(e);
  }

  render() {
    if (this.props.navState.homeAboutDropDownNav === true){
      return(
            <li className="dropdown" id="dropDownNav" style={{display:"inline"}}>
              <a href="#Main" className="dropbtn">Get Weather Forecast</a>
              <div className="dropdown-content">
                <a href="#Main"
                   id="useMyLocation"
                   onClick={this.handleNavClick}>Use My Location</a>
                <a href="#Main"
                   id="typeALocation"
                   onClick={this.handleNavClick}>Type In A Location</a>
              </div>
            </li>
          );
     } else {
       return null;
     }
  }
} // this component will be passed this.props.navState, .handleNavClick
