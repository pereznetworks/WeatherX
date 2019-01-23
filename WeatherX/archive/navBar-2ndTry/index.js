// react
import React, { Component } from 'react';

// styling
import '../../css/App.css';
import '../../css/mainContents.css';

// custom components
import Home from './home.js';
// import About from './about.js';
// import DropDownNav from './dropDownNav.js';
import GeoLocationCodingForm from './geoLocationCodingForm.js'

export default class NavBar2 extends Component {

    constructor(props) {
      super(props);
      this.state = {
        homeAboutDropDownNav: true,
        useMyLocation: true,
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
      <div id="mainNav">
        <img id="mainNavIcon" alt="" />
            <ul id="mainNav-content">
                  <Home homeAboutDropDownNav={this.state.homeAboutDropDownNav} handleNavClick={this.handleNavClick}/>
                  <GeoLocationCodingForm navState={this.state} handleNavClick={this.handleNavClick} handleNavSubmit={this.handleNavSubmit}/>
            </ul>
      </div>
    );
  }
} // this component controls the state of the app's UI components

 // <About homeAboutDropDownNav={this.state.homeAboutDropDownNav} handleNavClick={this.handleNavClick}/>
 // <DropDownNav navState={this.state} handleNavClick={this.handleNavClick}/>