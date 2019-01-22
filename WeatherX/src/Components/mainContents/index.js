import React, { Component } from 'react';
// import ReactMap from "react-mapbox-gl";
// import logo from '../imgs/logo.svg';

import GeoLocation from "./geoLocation.js";
import GeoCoding from "./geoCoding.js";
import About from "./about.js"

export default class MainContents extends Component {

// each item in state object refers to html element by that id

  constructor(props) {
    super(props);
    this.state = {
      home: true,
      geoLocationSubmit: true,
      typeALocation: true,
      geoLocationCodingForm: false,
      geoCoding: false,
      geoLocation: false
    };

    this.handleNavClick = this.handleNavClick.bind(this);
    this.handleNavSubmit = this.handleNavSubmit.bind(this);
  }

  componentDidMount(){
    this.setState({
      homeAboutDropDownNav: true,
      useMyLocation: true,
      typeALocation: true,
      geoLocationCodingForm: false,
      geoCoding: false,
      geoLocation: false
    });
  }

  handleNavClick(event) {
    if (event.target.textContent === 'Back'){
      this.setState({
        homeAboutDropDownNav: true,
        useMyLocation: true,
        typeALocation: true,
        geoLocationCodingForm: false,
        geoCoding: false,
        geoLocation: false
      })
    } else if (event.target.textContent === 'Use My Location'){
      this.setState({
        homeAboutDropDownNav: false,
        useMyLocation: false,
        typeALocation: false,
        geoLocationCodingForm: true,
        geoCoding: false,
        geoLocation: true
      })
    } else if (event.target.textContent === 'Type In A Location'){
      this.setState({
        homeAboutDropDownNav: false,
        useMyLocation: false,
        typeALocation: false,
        geoLocationCodingForm: true,
        geoCoding: true,
        geoLocation: false
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
                <GeoLocation />
                <GeoCoding />
                <About />
              </form>


            </div>

    );
  }
}

// <p id="imgPlacholder" alt=""></p>
