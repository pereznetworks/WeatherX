// react components

import React, { Component } from 'react';

// css styling
import '../../css/App.css';
import '../../css/grid-main2.css';

export default class Home extends Component {

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
            <li id="liHome" >
              <a
                 href="#Main"
                 id="Home"
                 onClick={this.handleNavClick}
              >Home</a>
            </li>
          );
    } else {
      return(
            <li id="liHome" >
              <a
                href="#Main"
                id="Home"
                onClick={this.handleNavClick}
              >Back</a>
            </li>
          );
    }
  }
} // this component will be passed this.props.homeAboutDropDownNav, .handleClick
