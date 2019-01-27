import React, { Component } from 'react';

// importing sub-components
import TitleBar from './titleBar';
import NavBar3 from './navBar3';
import MainView from "./mainView";
import LocationBar from "./locationBar";

// import css styling
import '../css/grid-main2.css';
import '../css/navBar3.css';

// creates one component for all sub-components
class Middle extends Component {

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
        mainView: false,
        locationBar:false
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
        mainView: false,
        locationBar:false
      });
    }

    handleNavClick(event) {
      if (event.target.title === 'backHome'){
        this.setState({
          home: true,
          geoLocation: false,
          geoCoding: false,
          about: false,
          mainView: false,
          locationBar:true
        })
      } else if (event.target.title === 'Find Me'){
        this.setState({
          home: true,
          geoLocation: true,
          geoCoding: false,
          about: false,
          mainView: false,
          locationBar:true
        })
      } else if (event.target.title === 'Submit Search'){
        this.setState({
          home: true,
          geoLocation: false,
          geoCoding: true,
          about: false,
          mainView: false,
          locationBar:true
        })
      } else if (event.target.title === 'About'){
        this.setState({
          home: false,
          geoLocation: false,
          geoCoding: false,
          about: true,
          mainView: false,
          locationBar:false
        })
      } else if (event.target.title === 'locationBar'){
        this.setState({
          home: false,
          geoLocation: false,
          geoCoding: false,
          about: false,
          mainView: true,
          locationBar: false
        })
      }

    }

    handleNavSubmit(event) {
      this.handleNavClick(event);
      // insert function to actually perform geoCoding or geoLocation
      console.log(`handleNavSubmit: Please implement me!`)
      console.log(event.target.title);
      event.preventDefault();
    }

  render(){
    return(

      <div className="middle">
        <TitleBar />
        <NavBar3
          navState={this.state}
          handleNavClick={this.handleNavClick}
          handleNavSubmit={this.handleNavSubmit}
          />
        <LocationBar
          navState={this.state}
          handleNavClick={this.handleNavClick}
          />
        <MainView
          navState={this.state}
          />
      </div>
    );
  }
}

export default Middle;
