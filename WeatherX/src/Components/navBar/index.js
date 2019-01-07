// react
import React, { Component } from 'react';

// styling
import '../../css/App.css';
import '../../css/grid-main.css';

// custom components
import Home from './home.js';
import About from './about.js';
import DropDownNav from './dropDownNav.js';

class NavBar extends Component {
  render() {
    return(
      <div id="navBar">
        <ul>
          <Home homeBackDisplayAttr={this.props.homeBackDisplayAttr}/>
          <About aboutDisplayAttr={this.props.aboutDisplayAttr}/>
          <DropDownNav dropDownNavDisplayAttr={this.props.navState}
          <form id="geoLocationCoding-Form">
            <p id="geoLocation-Label">To enable geolocation services, click here -></p>
            <input type="button" id="geoLocation-submit" />
            <input type="text" id="geoCoding-input" placeholder="Enter a location & click here ->" />
            <input type="button" id="geoCoding-submit"/>
          </form>
      </ul>
      </div>
    );
  }
}

export default NavBar
