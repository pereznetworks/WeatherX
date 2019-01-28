import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';

import GeoLocation from "./geoLocation.js";
import GeoCoding from "./geoCoding.js";
import AboutButton from "./about.js";

export default class NavBar3 extends Component {

// passing props, navState object,
// each element in object refers to a html element by true/false, render/dont render
// passing bound handler methods
// hanldeNavSubmit makes api call to back-end server
// hanldeNavClick used to render/not render: Home, GeoLocaton form, or About

  constructor(props) {
    super(props);
    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNavSubmit = this.handleNavSubmit.bind(this);
  }

  handleNavClick(event) {
    this.props.handleNavClick(event);
  }

  handleInputChange(e){
    this.props.handleInputChange(e);
  }

  handleNavSubmit(event) {
    this.props.handleNavSubmit(event);
  }

  render() {

            if (this.props.navState.home){
              return(
                <div id="navBar3">
                  <form id="geoLocation" action="">
                    <GeoLocation
                      navState={this.props.navState}
                      handleNavClick={this.handleNavClick}
                      handleNavSubmit={this.handleNavSubmit}/>
                    <GeoCoding
                      navState={this.props.navState}
                      handleNavClick={this.handleNavClick}
                      handleInputChange={this.handleInputChange}
                      handleNavSubmit={this.handleNavSubmit}/>
                    <AboutButton
                      navState={this.props.navState}
                      handleNavClick={this.handleNavClick}
                      handleNavSubmit={this.handleNavSubmit}/>
                  </form>
                </div>
             );
            } else {
              return (
                <div id="navBar3">
                  <form id="geoLocation" action="">
                    <div className="backHome-div">
                      <input
                        type="button"
                        className="geo-button"
                        id="backHome-button"
                        title="backHome"
                        onClick={this.props.handleNavClick}></input>
                    </div>
                  </form>
                </div>
              );
            }
    }
}
