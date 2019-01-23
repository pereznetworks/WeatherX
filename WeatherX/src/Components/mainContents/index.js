import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';

import GeoLocation from "./geoLocation.js";
import GeoCoding from "./geoCoding.js";
import About from "./about.js"

export default class MainContents extends Component {

// each item in state object refers to a html element by that id and/or a corresponding form action
// passing bound handler methods
// hanldeNavSubmit makes api call to back-end server
// hanldeNavClick used to load component; Home, GeoLocaton form, or About

  constructor(props) {
    super(props);
    this.state = {
      home: true,
      geoLocation: false,
      geoCoding: false,
      about: false,
    };

    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleNavSubmit = this.handleNavSubmit.bind(this);
  }

  componentDidMount(){
    this.setState({
      home: true,
      geoLocation: false,
      geoCoding: false,
      about: false,
    });
  }

  handleNavClick(event) {
    if (event.target.textContent === 'Home'){
      this.setState({
        home: true,
        geoLocation: false,
        geoCoding: false,
        about: false,
      })
    } else if (event.target.title === 'Find Me'){
      this.setState({
        home: false,
        geoLocation: true,
        geoCoding: false,
        about: false,
      })
    } else if (event.target.title === 'Submit Search'){
      this.setState({
        home: false,
        geoLocation: false,
        geoCoding: true,
        about: false,
      })
    } else if (event.target.title === 'About'){
      this.setState({
        home: false,
        geoLocation: false,
        geoCoding: false,
        about: true,
      })
    }

  }

  handleNavSubmit(event) {
    // insert function to actually perform geoCoding or geoLocation
    console.log(`handleNavSubmit: Please implement me!`)
    event.preventDefault();
  }

  render() {
    return(

            <div id="main-Content">

              <form id="geoLocation" action="">
                <GeoLocation
                  navState={this.state}
                  handleNavSubmit={this.handleNavSubmit}/>
                <GeoCoding
                  navState={this.state}
                  handleNavClick={this.handleNavClick}
                  handleNavSubmit={this.handleNavSubmit}/>
                <About
                  navState={this.state}
                  handleNavSubmit={this.handleNavSubmit}/>
              </form>


            </div>

    );
  }
}

// <p id="imgPlacholder" alt=""></p>
