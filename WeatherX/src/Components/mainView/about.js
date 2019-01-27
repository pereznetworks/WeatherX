import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';

import '../../css/mainView.css';

export default class About extends Component {

  // passing props, navState object,
  // each element in object refers to a html element by true/false, render/dont render
  // passing bound handler methods
  // hanldeNavSubmit makes api call to back-end server
  // hanldeNavClick used to render/not render: Home, GeoLocaton form, or About

    // constructor(props) {
    //   super(props);
    //   this.handleNavClick = this.handleNavClick.bind(this);
    //   this.handleNavSubmit = this.handleNavSubmit.bind(this);
    // }
    //
    // handleNavClick(event) {
    //   this.props.handleNavClick(event);
    // }
    //
    //
    // handleNavSubmit(event) {
    //   this.props.handleNavSubmit(event);
    // }

  render() {
      return(
        <div id="mainView" title='mainView'>
          <h3 id="AboutHeader">WeatherX</h3>

        </div>
      );
  }
}
