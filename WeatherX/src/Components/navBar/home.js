// react components

import React, { Component } from 'react';

// css styling
import '../../css/App.css';
import '../../css/grid-main.css';

class Home extends Component {
  render() {
    return(
          <li id="liHome" ><a href="#Main" id="Home">{this.props.homeBackDisplayAttr}</a></li>
        );
  }
} // this component will be passe props.textContent

export default Home;
