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
import '../css/weather.css';
import '../css/weather-icons.css';
import '../css/weather-icons-wind.css';

import dayjs from '../Utils';

// creates one component for all sub-components
class Middle extends Component {

  // hanldeNavSubmit takes input submitted (form) and makes api call to back-end server
  // hanldeNavClick takes event, based on selection and sets and loads components based on navState

    constructor(props) {
      super(props);
      /* note to self:
          ALWAYS set the first 4 boolean state values, since this controls which components are rendered and displayed
          home, about, mainView and locationBar

          home: initial view of app
                includes titleBar, navbar3
                home and locationBar can be true at the same time, but about and mainView are false
                about is true, but home, mainView and locationBar are false
                mainView is true, but home, about and locationBar are false

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
        forecastData: [],
        weatherConditions: {
          cloud:false,
          fog:false,
          hurrican:false,
          partlyCloudy:false,
          rain:false,
          sun:false,
          snow:false,
          scatteredShowers:false,
          thunder:false,
          wind:false,
        },
        prevHourTimeStamp: [],
        useHourlyConditions: [],
        hourlyConditions: [],
        dailyConditions: [],
        weatherIcon:{},
        notADuplicateLocation:true
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
      this.getHourOfDay = this.getHourOfDay.bind(this);
      this.whatDayIsIt = this.whatDayIsIt.bind(this);
      this.getHourlyConditions = this.getHourlyConditions.bind(this);
      this.getDailyConditions = this.getDailyConditions.bind(this);
      this.pickOutDataPoints = this.pickOutDataPoints.bind(this);
      this.pickOutDailyDataPoints = this.pickOutDailyDataPoints.bind(this);
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

// methods for integrating geoCode results and forecastData points into components

    pickOutDataPoints(dataObject, index){
      if (index === 0 ){
        return {
          hour: 'Now',  // datatype string
          icon: dataObject.icon,                      // datatype string
          temp: Math.floor(dataObject.temperature),   // datatype int
        };
      } else {
        return {
          hour: this.getHourOfDay(dataObject.time),  // datatype string
          icon: dataObject.icon,                      // datatype string
          temp: Math.floor(dataObject.temperature),   // datatype int
        };
      }
    }

    pickOutDailyDataPoints(dataObject, index){
        let today = new Date(dataObject.time * 1000);
        let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        return {
          day: daysOfWeek[today.getDay()],  // datatype string
          icon: dataObject.icon,                      // datatype string
          tempLow: Math.floor(dataObject.temperatureLow),   // datatype int
          tempHigh: Math.floor(dataObject.temperatureHigh),   // datatype int
        };
      }

    getHourlyConditions(dataArray){  // dataArray will be forecastData.data.daily.data
      return dataArray.map(this.pickOutDataPoints);
    }

    getDailyConditions(dataArray){
      return dataArray.map(this.pickOutDailyDataPoints);
    }

    getCurrentTimeAtLocation(dateInt){
      const dateOflocation = new Date(dateInt * 1000);

      let hrs = dateOflocation.getHours();
      let mins = dateOflocation.getMinutes();

      if (hrs > 12){
          hrs = hrs - 12;
          const time = `${hrs}:${mins} PM`;
          return time;
      } else if (hrs === 12){
          const time = `${hrs}:${mins} PM`;
          return time;
      } else if (hrs <= 11){
          const time = `${hrs}:${mins} AM`;
          return time;
      }
    }

    getHourOfDay(dayInt){
      // for whatever reason, the hourly timestamps need extra 000's to be a full timestamp
      const today = new Date(dayInt * 1000);

      let hrs = today.getHours();
      let day = today.getDay()
      let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

      if (hrs > 12){
          hrs = hrs - 12;
          return `${hrs} PM`;
      } else if (hrs > 1 && hrs <= 12){
          return `${hrs} AM`;
      } else if (hrs === 0){
          return '12 AM';
      } else if (hrs === 1){
          return daysOfWeek[day]
      }
    }

    whatDayIsIt(dateInt){
      // for whatever reason, the hourly timestamps need extra 000's to be a full timestamp
      const dateOflocation = new Date(dateInt * 1000);
      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return days[dateOflocation.getDay()]
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

      console.log(locationName, index);

      console.log(this.state.forecastData[index].data);


      // have forecastData ready ... now set mainView to true
      this.setState({
        currentLocation: {
          index: index,
          name: this.state.locationName[index],
          time: this.getCurrentTimeAtLocation(this.state.forecastData[index].data.mostRecentForecast.data.currently.time),
          temp: Math.floor(this.state.forecastData[index].data.mostRecentForecast.data.currently.temperature)
        },
        currentForecast: this.state.forecastData[index],
        hourlyConditions: this.getHourlyConditions(this.state.forecastData[index].data.mostRecentForecast.data.hourly.data),
        dailyConditions: this.getDailyConditions(this.state.forecastData[index].data.mostRecentForecast.data.daily.data),
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

      // dont accept duplicate locations
      // only get and store forecast data for a new location
      const compareLocationName = (item, index) => {
        if (item === this.state.geoCodeThis){
          this.setState({
            notADuplicateLocation: false
          });
        }
      };

      this.state.locationName.forEach(compareLocationName);

      if (this.state.notADuplicateLocation){
          this.requestDataFromServer(this.state.geoCodeThis, event);
        }

      // dont wnat app reset on form button submittions
      event.preventDefault();

    }

// this method makes the apicall get req to backendServer

    requestDataFromServer(location, event){

      // really should have another 'middle' function to validate input...
      // if no province, state then default to CA
      // let lookForCommaBetween = /,(?=[\sA-Za-z])/g;
      // if (!location.match(lookForCommaBetween)){
      //    location = `${this.state.geoCodeThis}, CA`;
      // }

      // once we have a valid location... get forecast data from backendServer
      console.log(`${this.backendServer.url}${this.backendServer.port}${this.backendServer.path}${this.state.geoCodeThis}`)
      axios.get(`${this.backendServer.url}${this.backendServer.port}${this.backendServer.path}${location}`)
            .then(response => {
              let newForecast = {  // save new current foreeast
                timeStamp: Date.now(),
                data: response.data
              }
              console.log(newForecast);
              /* will end up with array of objects:
                [
                  {
                    timeStamp:<dateInt>,
                    data:{ mostRecentLocation {},
                           mostRecentForecast:{}
                         }
                   },
                   {
                     timeStamp:<dateInt>,
                     data:{ mostRecentLocation {},
                            mostRecentForecast:{}
                          }
                    },
                    ...
                ]
              */

              // set state of nav, keep array of locations and respective forecasts
              // currentLocation wil always be the latest one entered, so new locationBar will be rendered for it
              // index of locationName array should always match index of forecastData array

              this.setState(
                {
                  forecastData: [...this.state.forecastData, newForecast], // will end up with an array of forecast objects
                  locationName: [...this.state.locationName, `${newForecast.data.mostRecentLocation.data.city}, ${newForecast.data.mostRecentLocation.data.province}`],
                  currentLocation: {
                    index: this.state.forecastData.length,
                    name: `${newForecast.data.mostRecentLocation.data.city}, ${newForecast.data.mostRecentLocation.data.province}`,
                    time: this.getCurrentTimeAtLocation(newForecast.data.mostRecentForecast.data.currently.time),
                    temp: Math.floor(newForecast.data.mostRecentForecast.data.currently.apparentTemperature)
                  },
                  locationCount: this.state.locationCount + 1,
                  home: true,
                  about: false,
                  mainView: false,
                  locationBar:true
                }
              )
              console.log(this.state);
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
          whatDayIsIt={this.whatDayIsIt}
          />
      </div>
    );
  }
}

export default Middle;


/*
temp: Math.floor(dataObject.temperatureHigh),            // datatype int
tempLow: Math.floor(dataObject.temperatureMin),         // datatype int
tempHigh: Math.floor(dataObject.temperatureMax),        // datatype int
*/
