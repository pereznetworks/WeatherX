// react components

import React, { Component } from 'react';

// css styling
import '../../css/App.css';
import '../../css/grid-main.css';

export default class About extends Component {

  constructor(props) {
    super(props);
    this.handleNavClick = this.handleNavClick.bind(this);
  }

  handleNavClick(e){
    this.props.handleNavClick(e);
  }


  render() {
    if (this.props.homeAboutDropDownNav === true){
      return(
            <li id="liAbout" style={{display:'inline'}}>
              <a
                href="#Main"
                id="About"
                onClick={this.handleNavClick}>About</a>
            </li>
          );
    } else {
      return(
            <li id="liAbout" style={{display:'none'}}><a href="#Main" id="About">About</a></li>
          );
    }
  }
} // this component will be passed props.homeAboutDropDownNav, .handleNavClick
