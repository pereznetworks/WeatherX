import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';

import GeoLocation from "./geoLocation.js";
import GeoCoding from "./geoCoding.js";
import About from "./about.js";

export default class MainContents extends Component {

// each item in state object refers to a html element by that id and/or a corresponding form action
// passing bound handler methods
// hanldeNavSubmit makes api call to back-end server
// hanldeNavClick used to load component; Home, GeoLocaton form, or About

  constructor(props) {
    super(props);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleNavSubmit = this.handleNavSubmit.bind(this);
  }

  handleNavClick(event) {
    this.props.handleNavClick(event);
  }


  handleNavSubmit(event) {
    this.props.handleNavSubmit(event);
  }

  render() {
    return(

            <div id="main-Content">

              <form id="geoLocation" action="">
                <GeoLocation
                  navState={this.props.navState}
                  handleNavClick={this.handleNavClick}
                  handleNavSubmit={this.handleNavSubmit}/>
                <GeoCoding
                  navState={this.props.navState}
                  handleNavClick={this.handleNavClick}
                  handleNavSubmit={this.handleNavSubmit}/>
                <About
                  navState={this.props.navState}
                  handleNavSubmit={this.handleNavSubmit}/>
              </form>

            </div>

    );
  }
}
