// react components

import React, { Component } from 'react';

// css styling
import '../../css/App.css';
import '../../css/grid-main.css';

class About extends Component {
  render() {
    return(
          <li id="liAbout" style={this.props.aboutDisplayAttr} ><a href="#Main" id="About">About</a></li>
        );
  }
} // this component will be passed props.displayAttr

export default About;
