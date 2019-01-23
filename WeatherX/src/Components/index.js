import React, { Component } from 'react';

// importing sub-components
import TitleBar from './titleBar.js';
import MainContent from './mainContents';
import MainView from "./mainView";

// import css styling
import '../css/grid-main2.css';
import '../css/mainContents.css';

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
        mainView: false
      });
    }

    handleNavClick(event) {
      if (event.target.textContent === 'Home'){
        this.setState({
          home: true,
          geoLocation: false,
          geoCoding: false,
          about: false,
          mainView: false
        })
      } else if (event.target.title === 'Find Me'){
        this.setState({
          home: false,
          geoLocation: true,
          geoCoding: false,
          about: false,
          mainView: true
        })
      } else if (event.target.title === 'Submit Search'){
        this.setState({
          home: false,
          geoLocation: false,
          geoCoding: true,
          about: false,
          mainView: true
        })
      } else if (event.target.title === 'About'){
        this.setState({
          home: false,
          geoLocation: false,
          geoCoding: false,
          about: true,
          mainView: false
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
        <MainContent
          navState={this.state}
          handleNavClick={this.handleNavClick}
          handleNavSubmit={this.handleNavSubmit}
        />
        <MainView
          navState={this.state}/>
      </div>
    );
  }
}

export default Middle;
