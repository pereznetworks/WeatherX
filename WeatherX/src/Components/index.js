import React, { Component } from 'react';

// importing sub-components
import TitleBar from './titleBar';
import NavBar3 from './navBar3';
import MainView from "./mainView";
import LocationBar from "./locationBar";

// import css styling
import '../css/navBar3.css';
import '../css/mainView.css';
import '../css/locationBar.css';
import '../css/grid-main2.css';

// creates one component for all sub-components
class Middle extends Component {

  // hanldeNavSubmit takes input and makes api call to back-end server
  // hanldeNavClick used to load components based on navState

    constructor(props) {
      super(props);
      this.state = {
        home: true,
        geoLocation: false,
        geoCoding: false,
        about: false,
        mainView: false,
        locationBar:false,
        locationName: [],
        locationCount: 0,
        currentLocation:'',
        showMeThisOne:''
      };

      this.handleNavClick = this.handleNavClick.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this)
      this.handleNavSubmit = this.handleNavSubmit.bind(this);
      this.showMeThisOne = this.showMeThisOne.bind(this);
    }

    componentDidMount(){
      this.setState({
        home: true,
        geoLocation: false,
        geoCoding: false,
        about: false,
        mainView: false,
        locationBar:false,
        currentLocation:'',
        showMeThisOne:''
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
      } else if (event.target.title === 'About WeatherX'){
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

    showMeThisOne(locationName){
      console.log(locationName);
      this.setState({
        currentLocation: locationName,
        home: false,
        geoLocation: false,
        geoCoding: false,
        about: false,
        mainView: true,
        locationBar: false
      })

    }

    handleInputChange(event) {
      this.setState(
          {geoCodeThis: event.target.value}
        );
    }

    handleNavSubmit(event) {
      if (this.state.currentLocation !== this.state.geoCodeThis){
        // dont accept duplicate locations entered
        // only setState if new location,
        this.setState( // set state of nav, keep array of locations entered
            {
             locationName: [...this.state.locationName, this.state.geoCodeThis],
             currentLocation: this.state.geoCodeThis,
             locationCount: this.state.locationCount + 1
             }
           )
      }

      // now can display appropriate component
      this.handleNavClick(event);

      // insert function to submit request to backend server
      console.log(`requestDataFromServer: Please implement me!`)

      // dont wnat app reset on form button submittions
      event.preventDefault();

    }

  render(){
    return(

      <div className="middle">
        <TitleBar />
        <NavBar3
          navState={this.state}
          handleNavClick={this.handleNavClick}
          handleInputChange={this.handleInputChange}
          handleNavSubmit={this.handleNavSubmit}
          getCurrentLocation={this.getCurrentLocation}
          />
        <LocationBar
          navState={this.state}
          handleNavClick={this.handleNavClick}
          showMeThisOne={this.showMeThisOne}
          />
        <MainView
          navState={this.state}
          />
      </div>
    );
  }
}

export default Middle;
