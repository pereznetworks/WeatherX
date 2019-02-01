import React, { Component } from 'react';
import axios from 'axios';

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
      /* note to the wise:
          ALWAYS set the first 3 boolean state values, since this controls which components are rendered and displayed

          home (includes navBar3) and locationBar can be true at the same time
          home and locatonBar must be false when mainView is true

          about: the about WeatherX app page

          geoCoding and geoLocation : indicate which method used to pinpoint which location to get forecastData for

          locatonName: array of typed locations
          locationCount: how many locations typed

          currentLocation: location to be displayed in mainView
          currentForecast: latest forecast recevied from backendServer

          showMeThisOne: deprecated by currentLocation, will remove

          forecastData: array of forecastData objects { timeStamp:dateInt, data:{jsonobject} }
      */

      this.state = {
        home: true,
        about: false,
        mainView: false,
        locationBar:false,
        geoLocation: false,
        geoCoding: false,
        locationName: [],
        locationCount: 0,
        currentLocation:'',
        currentForecast: {},
        showMeThisOne:'',
        forecastData: []
      };

      this.backendServer = {
        url: `http://10.100.10.103`,
        port: `:9999`,
        path: '/weather:'
      };

      this.handleNavClick = this.handleNavClick.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this)
      this.handleNavSubmit = this.handleNavSubmit.bind(this);
      this.showMeThisOne = this.showMeThisOne.bind(this);
      this.getCurrentTimeAtLocation = this.getCurrentTimeAtLocation.bind(this);
    }

    componentDidMount(){
      this.setState({
        home: true,
        about: false,
        mainView: false,
        locationBar:false,
        currentLocation:'',
        showMeThisOne:''
      });
    }


    getCurrentTimeAtLocation(dateInt){
      const dateOflocation = new Date(dateInt);
      if (this.state.geoCodeThis){
        let hrs = dateOflocation.getHours()
        let mins = dateOflocation.getMinutes()
        if (hrs >= 12){
          hrs = hrs - 12;
          const time = `${hrs}:${mins} PM`;
          return time;
        } else if (hrs <= 11){
          const time = `${hrs}:${mins} AM`;
          return time;
        }

      }
    }

    handleNavClick(event) {
      if (event.target.title === 'backHome'){
        this.setState({
          home: true,
          about: false,
          mainView: false,
          locationBar:true
        })
      } else if (event.target.title === 'Find Me'){
        this.setState({
          home: true,
          about: false,
          mainView: false,
          locationBar:true
        })
      } else if (event.target.title === 'Submit Search'){
        this.setState({
          home: true,
          about: false,
          mainView: false,
          locationBar:true
        })
      } else if (event.target.title === 'About WeatherX'){
        this.setState({
          home: false,
          about: true,
          mainView: false,
          locationBar:false
        })
      } else if (event.target.title === 'locationBar'){
        this.setState({
          home: false,
          about: false,
          mainView: true,
          locationBar: false
        })
      }
    }

    showMeThisOne(locationName, index){
      console.log(locationName);


      // have forecastData ready ... now set mainView to true
      this.setState({
        currentLocation: {
          name: this.state.locationName[index],
          time: this.getCurrentTimeAtLocation(this.state.forecastData[index].data.currently.time),
          temp: Math.floor(this.state.forecastData[index].data.currently.temperature)
        },
        currentForecast: this.state.forecastData[index],
        home: false,
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

      // dont accept duplicate locations entered
      // only get and store forecast data for a new location
      if (this.state.currentLocation !== this.state.geoCodeThis){

        this.requestDataFromServer(this.geoCodeThis, event)

      }

      // dont wnat app reset on form button submittions
      event.preventDefault();

    }

    requestDataFromServer(location, event){

      // really should have another 'middle' function to validate input...

      // once we have a valid location... get forecast data from backendServer
      console.log(`${this.backendServer.url}${this.backendServer.port}${this.backendServer.path}${this.state.geoCodeThis}`)
      axios.get(`${this.backendServer.url}${this.backendServer.port}${this.backendServer.path}${location}`)
            .then(response => {
              let forecast = response.data;
              let newForecast = {  // save new current foreeast
                timeStamp: Date.now(),
                data: forecast.data
              } // will end up with objects: [{timeStamp:<dateInt>, data:forecast.json}]
              console.log(newForecast);

              // set state of nav, keep array of locations and respective forecasts
              // currentLocation wil always be the latest one entered, so new locationBar will be rendered for it
              // index of locationName array should always match index of forecastData array

              this.setState(
                {
                  forecastData: [...this.state.forecastData, newForecast], // will end up with an array of forecast objects
                  locationName: [...this.state.locationName, this.state.geoCodeThis],
                  currentLocation: {
                    name: this.state.geoCodeThis,
                    time: this.getCurrentTimeAtLocation(newForecast.data.currently.time),
                    temp: Math.floor(newForecast.data.currently.apparentTemperature)
                  },
                  locationCount: this.state.locationCount + 1,
                  home: true,
                  about: false,
                  mainView: false,
                  locationBar:true
                }

              )
            }).catch(err => {

              // No Chewy, THAT one goes there, THIS one goes here.... AAGH AANGH!
              console.log('Error fetching or parsing data', err);
              this.setState(
                {
                  err: err
                }
              )
            });
    }

  render(){
    return(

      <div className="middle middle-grid-container">
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
          getCurrentTimeAtLocation={this.getCurrentTimeAtLocation}
          />
        <MainView
          navState={this.state}
          />
      </div>
    );
  }
}

export default Middle;
