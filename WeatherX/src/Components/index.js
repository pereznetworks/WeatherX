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

// may use dayJs-ext or moment0-timezone for timezone time adjustment
// For now, using my own custom code to adjust from UTC to timezone offset of location

// creates one component for all sub-components

/*   state boolean values control  which components are rendered and displayed
      home, about, mainView and locationBar

      home: initial view of app
            includes titleBar, navbar3
            home and locationBar can be true at the same time, but about and mainView are false
            when about is true; home, mainView and locationBar are false
            when mainView is tru;  home, about and locationBar are false

      about: blog and about WeatherX app page

      geoCoding and geoLocation : indicate which method used to pinpoint which location to get forecastData for
 */

export default class Middle extends Component {

    constructor(props) {
      super(props);

      this.state = {
        home: true,
        about: false,
        inputForm: true,
        controlsForm: false,
        mainView: false,
        locationBar:false,
        geoLocation: false,
        geoCoding: false,
        noBlankInputMsg: false
      }; // using state to control component rendering

      this.backendServer = {
        url: `http://10.100.10.103`,
        port: `:9999`,
        path: '/weather:'
      }; // object to use when making calls to backendServer

      this.appData = {
        errMsg: '',
        err: false,
        geoCodeThis:'',
        showMeThisOne:'',
        notADuplicateLocation:true,
        date: new Date(),
        currentDay:[],
        currentDayIndex: 0,
        forecastData: [],
        locationData: [],
        availLocationsArray: [],
        mainViewBackGround: [],
        locationBarBackGround: [],
        locationCount: 0,
        currentLocation:'',
        currentForecast: {},
        currentLocationData: [],
        hourlyConditions: [],
        dailyConditions: [],
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
        weatherIcon:{},
        tickTock: 1000,
        fahrenheitType:true,
        fahrenheitFont:"°F",
        celsiusType:true,
        celsiusFont:"°C"
      }; // all other appData

      // time, date conversion, date formatting methods
      this.getUpToSecDateOfLocation = this.getUpToSecDateOfLocation.bind(this);
      this.getTZhours = this.getTZhours.bind(this);
      this.formatTime = this.formatTime.bind(this);
      this.getCurrentTimeAtLocation = this.getCurrentTimeAtLocation.bind(this);
      this.getHourOfDay = this.getHourOfDay.bind(this);
      this.whatDayIsIt = this.whatDayIsIt.bind(this);

      // data integration and processing methods
      this.getHourlyConditions = this.getHourlyConditions.bind(this);
      this.getDailyConditions = this.getDailyConditions.bind(this);
      this.pickOutDataPoints = this.pickOutDataPoints.bind(this);
      this.pickOutDailyDataPoints = this.pickOutDailyDataPoints.bind(this);
      this.setMainViewBackGround = this.setMainViewBackGround.bind(this);
      this.setLocationBarBackGround = this.setLocationBarBackGround.bind(this);
      this.checkDay = this.checkDay.bind(this);
      this.clock = this.clock.bind(this);
      this.getLiveFormatedTime = this.getLiveFormatedTime.bind(this);

      // temp conversion
      this.tempTypeConversion = this.tempTypeConversion.bind(this);

      // main app methods
      this.handleNavClick = this.handleNavClick.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this)
      this.handleNavSubmit = this.handleNavSubmit.bind(this);
      this.showMeThisOne = this.showMeThisOne.bind(this);
      this.removeLocation = this.removeLocation.bind(this);
    }

    componentDidMount(){
      this.appData = {
        errMsg: '',
        err: false,
        geoCodeThis:'',
        showMeThisOne:'',
        notADuplicateLocation:true,
        date: new Date(),
        currentDay:[],
        currentDayIndex: 0,
        forecastData: [],
        locationData: [],
        availLocationsArray: [],
        mainViewBackGround: [],
        locationBarBackGround: [],
        locationCount: 0,
        currentLocation:'',
        currentForecast: {},
        currentLocationData: [],
        hourlyConditions: [],
        dailyConditions: [],
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
        weatherIcon:{},
        tickTock: 1000,
        fahrenheitType:true,
        fahrenheitFont:"°F",
        celsiusType:true,
        celsiusFont:"°C"
      };
    };  // contructing appData

    componentWillUnmount(){
      clearInterval(this.appData.tickTock);
      this.appData = null;
    }; // destroy app and it's data

// date format and timezone conversion methods

  clock(){
    this.appData.date = new Date();
  }

  getUpToSecDateOfLocation(dateInt){
    // for whatever reason, the hourly timestamps need extra 000's to be a full timestamp
  return new Date(dateInt * 1000);
  }

  checkDay(dateInt, tz, sunset){
    // dont need actual current timeout
    // need to calc whether for a given hour of the day...
    // for specific location ..is it nighttime or daytime
    let tzHrs = this.getTZhours(this.getUpToSecDateOfLocation(dateInt), tz);
    let tzSunset = this.getTZhours(this.getUpToSecDateOfLocation(sunset), tz);
    console.log(dateInt, tz, sunset, tzHrs, tzSunset);

    if(tzHrs > tzSunset){
      return false;  // so it's night time in this timezone
    } else {
      return true; // so it's still daytime in this timezone
    }
  }

  getTZhours(dateInt, tz){
    let utc = dateInt.getUTCHours();
    let hrs;

    if (tz < 0){
      tz = Math.abs(tz);
      if (utc < 12 ){
        utc = utc + 24
        hrs = utc - tz;
      } else if (utc === 0){
        hrs = utc - tz;
        hrs = 24 - tz
      } else {
        hrs = utc - tz;
      }

    } else {
        hrs = utc + tz;
    }

    return hrs; // still a 24 hours hour

  }

  formatTime(hrs, mins, secs){
    hrs = Math.floor(hrs);
    if (secs){
      if (hrs > 24){
         hrs = hrs - 24;
         return `${hrs}:${mins}:${secs} PM`;
      } else if (hrs > 12){
         hrs = hrs - 12;
         return `${hrs}:${mins}:${secs} PM`;
      } else if (hrs === 24){
         hrs = 12;
         return `${hrs}:${mins}:${secs} AM`;
      } else if (hrs === 12){
         return `${hrs}:${mins}:${secs} PM`;
      } else if (hrs <= 11){
         return `${hrs}:${mins}:${secs} AM`;
      }
    } else if (mins){
      if (hrs > 24){
         hrs = hrs - 24;
         return `${hrs}:${mins} PM`;
      } else if (hrs > 12){
         hrs = hrs - 12;
         return `${hrs}:${mins} PM`;
      } else if (hrs === 24){
         hrs = 12;
         return `${hrs}:${mins} AM`;
      } else if (hrs === 12){
         return `${hrs}:${mins} PM`;
      } else if (hrs <= 11){
         return `${hrs}:${mins} AM`;
      }
    } else {
      if (hrs > 24){
         hrs = hrs - 24;
         return `${hrs} AM`;
      } else if (hrs > 12 && hrs < 24){
         hrs = hrs - 12;
         return `${hrs} PM`;
      }  else if(hrs === 24){
         hrs = 12;
         return `${hrs} AM`;
      } else if (hrs === 12){
         return `${hrs} PM`;
      } else if (hrs <= 11){
         return `${hrs} AM`;
      }
    }
  }

  getLiveFormatedTime(dateInt, tz){
    let date = dateInt;
    let hrs, mins, secs;

    hrs = this.getTZhours(date, tz);

    mins = date.getUTCMinutes();
    if (mins < 10) {
      mins = "0" + mins;
    }

    secs = date.getUTCSeconds();
    if (secs < 10) {
      secs = "0" + secs;
    }

    return this.formatTime(hrs, mins, secs);

  }

  getCurrentTimeAtLocation(dateInt, tz){
    let date = this.appData.date;
    let hrs, mins;

    hrs = this.getTZhours(date, tz);

    mins = date.getUTCMinutes();
    if (mins < 10) {
      mins = "0" + mins;
    }

    return this.formatTime(hrs, mins);

  }

  getHourOfDay(dateInt, tz){

    const today = this.getUpToSecDateOfLocation(dateInt);

    let hrs = this.getTZhours(today, tz);
    let hourOfDay = this.formatTime(hrs);
    let nextDay;

    this.appData.currentDay = [...this.appData.currentDay, today.getDay()];
    this.appData.currentDayIndex = this.appData.currentDay.length - 1;
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if (hourOfDay === '0 AM' || hourOfDay === '12 AM'){
        nextDay = this.appData.currentDay[this.appData.currentDayIndex];
        return daysOfWeek[nextDay];
    } else {
      return hourOfDay;
    }
  }

  whatDayIsIt(dateInt){
    // for whatever reason, the hourly timestamps need extra 000's to be a full timestamp

    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    // let today = new Date();
    // this.appData.currentDay = [...this.appData.currentDay, today.getDay()];
    // this.appData.currentDayIndex = this.appData.currentDay.length - 1;

    const dateOflocation = this.getUpToSecDateOfLocation(dateInt);

    // if (dateOflocation.getDay() !== currentDay[0] ){
    //   this.appData.refreshData = true;
    // } else {
    //   return daysOfWeek[dateOflocation.getDay()];
    // }

    return daysOfWeek[dateOflocation.getDay()];
  }


// temp type conversion method

  tempTypeConversion(tempF, tempNum){
    if (!tempF){
      // if not fahrenheit, then convert back to fahrenheit
      return Math.round((tempNum - 32 ) / 1.8);
    } else {
      return tempNum;
    }
     // wont need to convert fahrenheit back to celsius
     // but if so...
     // return Math.round((tempNum *  1.8) + 32);
  }

// methods for integrating geoCode results and forecastData points into components

    checkRefresh(indexno){
      this.appData.refreshArray =  [...this.appData.refreshArray, indexno];
    }

    pickOutDataPoints(dataObject, index){

      // may implement an 'update' to hourly conditions later
      // let dateX = this.getUpToSecDateOfLocation(dataObject.time);
      // let hourX = this.getTZhours(dateX, this.appData.currentLocationData.utcOffSet);
      // let currentHour =  this.getTZhours(new Date(), this.appData.currentLocationData.utcOffSet);

      if (index === 0 ){
        return {
          day: this.checkDay(dataObject.time, this.appData.currentLocationData.utcOffSet, this.appData.currentLocationData.sunsetTime),
          hour: 'Now',  // datatype string
          icon: dataObject.icon,                      // datatype string
          temp: this.tempTypeConversion(this.appData.fahrenheitType, Math.floor(dataObject.temperature)),   // datatype int
        };
      } else {
        return {
          day: this.checkDay(dataObject.time, this.appData.currentLocationData.utcOffSet, this.appData.currentLocationData.sunsetTime),
          hour: this.getHourOfDay(dataObject.time, this.appData.currentLocationData.utcOffSet),  // datatype string
          icon: dataObject.icon,                      // datatype string
          temp: this.tempTypeConversion(this.appData.fahrenheitType, Math.floor(dataObject.temperature)),   // datatype int
        };
      }
    }

    pickOutDailyDataPoints(dataObject, index){
        let today = new Date(dataObject.time * 1000);
        let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        return {
          day: daysOfWeek[today.getDay()],  // datatype string
          icon: dataObject.icon,                      // datatype string
          tempLow: this.tempTypeConversion(this.appData.fahrenheitType, Math.floor(dataObject.temperatureLow)),   // datatype int
          tempHigh: this.tempTypeConversion(this.appData.fahrenheitType, Math.floor(dataObject.temperatureHigh)),   // datatype int
        };
      }

    getHourlyConditions(dataArray){
      console.log(dataArray)
      return dataArray.map(this.pickOutDataPoints);
    }

    getDailyConditions(dataArray){
      return dataArray.map(this.pickOutDailyDataPoints);
    }

    setMainViewBackGround(data){


      let day = this.checkDay(data.currently.time, data.offset, data.daily.data[0].sunsetTime );
      let icon = data.currently.icon;

         if ( icon === 'cloudy' && day){
            return "cloudyDay"
          } else if ( icon === 'cloudy' && !day){
             return "cloudyNight"
          } else if ( icon === 'fog' && day){
            return "foggyDay";
          } else if ( icon === 'fog' && !day){
            return "foggyNight";
          } else if ( icon === 'partly-cloudy-day'){
            return "partlyCloudyDay";
          } else if ( icon === 'partly-cloudy-night'){
            return "partlyCloudyNight";
          } else if ( icon === 'rain' && day){
            return "rainyDay";
          } else if ( icon === 'rain' && !day){
            return "rainyNight";
          } else if ( icon === 'clear-day' && day){
            return "clearDay";
          } else if ( icon === 'clear-night' && !day){
            return "clearNight";
          } else if ( icon === 'snow' && day){
            return "snowyDay";
          } else if ( icon === 'snow' && !day){
            return "snowyNight";
          } else if ( icon === 'scattered-showers' && day ){
            return "rainyDay";
          } else if ( icon === 'scattered-showers' && !day ){
            return "rainyNight";
          } else if ( icon === 'thunder' && day ){
            return "thunderDay";
          } else if ( icon === 'thunder' && !day ){
            return "thunderNight";
          } else if ( icon === 'wind' && day ){
            return "windyDay";
          } else if ( icon === 'wind' && !day ){
            return "windyNight";
          }
    }

    setLocationBarBackGround(data){

      let day = this.checkDay(data.currently.time, data.offset, data.daily.data[0].sunsetTime);
      let icon = data.currently.icon;

         if ( icon === 'cloudy' && day){
            return "locationBar-cloudyDay";
          } else if ( icon === 'cloudy' && !day){
             return "locationBar-cloudyNight";
          } else if ( icon === 'fog' && day){
            return "locationBar-foggyDay";
          } else if ( icon === 'fog' && !day){
            return "locationBar-foggyNight";
          } else if ( icon === 'partly-cloudy-day'){
            return "locationBar-partlyCloudyDay";
          } else if ( icon === 'partly-cloudy-night'){
            return "locationBar-partlyCloudyNight";
          } else if ( icon === 'rain' && day){
            return "locationBar-rainyDay";
          } else if ( icon === 'rain' && !day){
            return "locationBar-rainyNight";
          } else if ( icon === 'clear-day' && day){
            return "locationBar-clearDay";
          } else if ( icon === 'clear-night' && !day){
            return "locationBar-clearNight";
          } else if ( icon === 'snow' && day){
            return "locationBar-snowyDay";
          } else if ( icon === 'snow' && !day){
            return "locationBar-snowyNight";
          } else if ( icon === 'scattered-showers' && day ){
            return "locationBar-rainyDay";
          } else if ( icon === 'scattered-showers' && !day ){
            return "locationBar-rainyNight";
          } else if ( icon === 'thunder' && day ){
            return "locationBar-thunderDay";
          } else if ( icon === 'thunder' && !day ){
            return "locationBar-thunderNight";
          } else if ( icon === 'wind' && day ){
            return "locationBar-windyDay";
          } else if ( icon === 'wind' && !day ){
            return "locationBar-windyNight";
          }
    }

    handleNavClick(event) {

        // dont want app reset on form button submittions
        console.log(event);
        console.log(this.appData.geoCodeThis)
        if (this.appData.geoCodeThis === ''){
          this.setState({
            home: true,
            about: false,
            mainView: false,
            locationBar: true,
            inputForm: true,
            controlsForm: false
          })
        } else {
          if (event.target.title === 'backHome' || event.target.title === 'remove'){
            this.setState({
              home: true,
              about: false,
              mainView: false,
              locationBar:true,
              inputForm: false,
              controlsForm: true
            })
          } else if (event.target.title === 'Find Me'){
            this.setState({
              home: true,
              about: false,
              mainView: false,
              locationBar:true,
              inputForm: false,
              controlsForm: true
            })
          } else if (event.target.title === 'Submit Search'){
            this.setState({
              home: true,
              about: false,
              mainView: false,
              locationBar:true,
              inputForm: false,
              controlsForm: true
            })
          } else if (event.target.title === 'About WeatherX'){
            this.setState({
              home: false,
              about: true,
              mainView: false,
              locationBar:false,
              inputForm: false,
              controlsForm: true
            })
          } else if (event.target.title === 'locationBar'){
            this.setState({
              home: false,
              about: false,
              mainView: true,
              locationBar: false,
              inputForm: false,
              controlsForm: true
            })
          } else if (event.target.title === "Add Location"){
            this.setState({
              home: true,
              about: false,
              mainView: false,
              locationBar: true,
              inputForm: true,
              controlsForm: false
            })
          } else if (event.target.title === "Celsius"){
           this.setState({
            home: true,
            about: false,
            mainView: false,
            locationBar: true,
            inputForm: false,
            controlsForm: true
          })
          this.appData.celsiusType=true;
          this.appData.fahrenheitType=false;
        } else if (event.target.title === "Fahrenheit"){
            this.setState({
              home: true,
              about: false,
              mainView: false,
              locationBar: true,
              inputForm: false,
              controlsForm: true
            })
            this.appData.celsiusType=false;
            this.appData.fahrenheitType=true;
          }
        }
    }

    handleInputChange(event) {
      if (!event){
        this.appData.geoCodeThis = '';
      } else {
        event.preventDefault();
        this.appData.geoCodeThis = event.target.value;
      }
    }

    handleNavSubmit(event) {

      // dont wnat app reset on form button submittions
      event.preventDefault();

      if (!this.appData.geoCodeThis){

        // dont accept blank input
        this.setState({
          home: true,
          about: false,
          mainView: false,
          locationBar:true,
          inputForm: true,
          controlsForm: false,
          noBlankInputMsg:true
        })

      } else {
        // dont accept duplicate locations
        // only get and store forecast data for a new location
        const compareLocationName = (item, index) => {
          let locationName = `${item.cityName}, ${item.province}`;
          if (locationName === this.appData.geoCodeThis){
            this.appData.notADuplicateLocation = false;
           }
        };

        if (this.appData.locationData.length > 0){
          this.appData.locationData.forEach(compareLocationName);
        }

        if (this.appData.notADuplicateLocation){
            this.requestDataFromServer(this.appData.geoCodeThis);
        }

      }

    }

// remove a location

    removeLocation(event, locationIndex){
      this.appData.locationData.splice(locationIndex, 1);
      this.appData.forecastData.splice(locationIndex, 1);
      this.appData.availLocationsArray.splice(locationIndex, 1);
      this.appData.locationBarBackGround.splice(locationIndex, 1);
      this.appData.mainViewBackGround.splice(locationIndex, 1);
      this.appData.locationCount = this.appData.locationCount - 1;

      this.handleNavClick(event);

    }

// this method simply takes the locationName and preps the data needed to display it
// it moves the corresponding forecastData and locationData into the currentLocationData object
// and preps hourlyConditions and dailyConditions array

    showMeThisOne(locationName, index, event){

      if (event.target.title === 'remove'){
        this.removeLocation(event, index);
      } else {
        // have forecastData ready ... now set mainView to true
        this.appData.currentLocationData = {
            index: index,
            name: `${this.appData.locationData[index].data.city}, ${this.appData.locationData[index].data.province}`,
            sunsetTime: this.appData.forecastData[index].data.daily.data[0].sunsetTime,
            utcOffSet: this.appData.forecastData[index].data.offset,
            time: this.getCurrentTimeAtLocation(this.appData.forecastData[index].data.currently.time, this.appData.forecastData[index].data.offset),
            temp: this.tempTypeConversion(this.appData.fahrenheitType, Math.floor(this.appData.forecastData[index].data.currently.temperature)),
            day: this.checkDay(this.appData.forecastData[index].data.currently.time, this.appData.forecastData[index].data.offset, this.appData.forecastData[index].data.daily.data[0].sunsetTime),
            icon: this.appData.forecastData[index].data.currently.icon
          };

         this.appData.currentForecast = this.appData.forecastData[index].data;
         this.appData.hourlyConditions = this.getHourlyConditions(this.appData.forecastData[index].data.hourly.data);
         this.appData.dailyConditions = this.getDailyConditions(this.appData.forecastData[index].data.daily.data);

        this.setState({
          home: false,
          about: false,
          mainView: true,
          locationBar: false,
          inputForm: false,
          controlsForm: true
        })

        console.log(locationName, index);
        console.log(this.appData, this.state);
      }

    }

// this method makes the apicall get req to backendServer
// only handleNavSubmit calls this method
// never called by other methods or components

// this also the only method that adds a location
    requestDataFromServer(location){

      // really should have another 'middle' function to validate input...
      // to keep invalid requests to server from using up api call bandwitdh and limits

      // if no province, state then default to CA, or US
      // otherwise will need to get a db of all citynames from everywhere !!
      // like...
      // let lookForCommaBetween = /,(?=[\sA-Za-z])/g;
      // if (!location.match(lookForCommaBetween)){
      //    location = `${this.state.geoCodeThis}, CA`;
      //    or
      //    location = `${this.state.geoCodeThis}, US`;
      // }

      // once we have a valid location... get forecast data from backendServer
      console.log(`${this.backendServer.url}${this.backendServer.port}${this.backendServer.path}${location}`)
      axios.get(`${this.backendServer.url}${this.backendServer.port}${this.backendServer.path}${location}`)
            .then(response => {
              let newForecast = {  // save new current foreeast
                timeStamp: Date.now(),
                data: response.data
              }
              console.log(newForecast); // will end up with array of objects

              // currentLocation will always be the latest one entered, so new locationBar will be rendered for it
              // index of locationName array should always match index of forecastData array

                  this.appData.forecastData = [...this.appData.forecastData, newForecast.data.mostRecentForecast];
                  this.appData.locationData =  [...this.appData.locationData, newForecast.data.mostRecentLocation];
                  this.appData.currentLocationData = {
                    index: this.appData.forecastData.length,
                    name: `${newForecast.data.mostRecentLocation.data.city}, ${newForecast.data.mostRecentLocation.data.province}`,
                    sunsetTime: newForecast.data.mostRecentForecast.data.daily.data[0].sunsetTime,
                    utcOffSet: newForecast.data.mostRecentForecast.data.offset,
                    time: this.getCurrentTimeAtLocation(newForecast.data.mostRecentForecast.data.currently.time, newForecast.data.mostRecentForecast.data.offset),
                    day: this.checkDay(newForecast.data.mostRecentForecast.data.currently.time, newForecast.data.mostRecentForecast.data.offset, newForecast.data.mostRecentForecast.data.daily.data[0].sunsetTime),
                    temp: Math.floor(newForecast.data.mostRecentForecast.data.currently.apparentTemperature),
                    icon:`${newForecast.data.mostRecentForecast.data.currently.icon}`
                  };
                  this.appData.availLocationsArray = [...this.appData.availLocationsArray, {
                    index: this.appData.forecastData.length,
                    name: `${newForecast.data.mostRecentLocation.data.city}, ${newForecast.data.mostRecentLocation.data.province}`,
                    utcOffSet: newForecast.data.mostRecentForecast.data.offset,
                    timeStamp: newForecast.data.mostRecentForecast.data.currently.time,
                    sunsetTime: newForecast.data.mostRecentForecast.data.daily.data[0].sunsetTime,
                    time: this.getCurrentTimeAtLocation(newForecast.data.mostRecentForecast.data.currently.time, newForecast.data.mostRecentForecast.data.offset),
                    day: this.checkDay(newForecast.data.mostRecentForecast.data.currently.time, newForecast.data.mostRecentForecast.data.offset, newForecast.data.mostRecentForecast.data.daily.data[0].sunsetTime),
                    temp: Math.floor(newForecast.data.mostRecentForecast.data.currently.apparentTemperature),
                    icon:`${newForecast.data.mostRecentForecast.data.currently.icon}`
                  }];
                  this.appData.locationCount = this.appData.locationCount + 1;
                  this.appData.mainViewBackGround = [...this.appData.mainViewBackGround, this.setMainViewBackGround(newForecast.data.mostRecentForecast.data)];
                  this.appData.locationBarBackGround =  [...this.appData.locationBarBackGround, this.setLocationBarBackGround(newForecast.data.mostRecentForecast.data)];

                // refreshing state of main components
                // requestDataFromServer is only called by NavBar3's submit form
                this.setState({
                  home: true,
                  about: false,
                  mainView: false,
                  locationBar:true,
                  inputForm: false,
                  controlsForm: true
                })

              console.log(this.state, this.appData);

            }).catch(err => {

              // No Chewy, THAT one goes there, THIS one goes here.... AAGH AANGH!
              console.log('Error fetching or parsing data', err);
              this.setState(
                {
                  errMsg: err
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
          appData={this.appData}
          handleNavClick={this.handleNavClick}
          handleInputChange={this.handleInputChange}
          handleNavSubmit={this.handleNavSubmit}
          getCurrentLocation={this.getCurrentLocation}
          />
        <LocationBar
          navState={this.state}
          appData={this.appData}
          handleNavClick={this.handleNavClick}
          showMeThisOne={this.showMeThisOne}
          checkDay={this.checkDay}
          getCurrentTimeAtLocation={this.getCurrentTimeAtLocation}
          getUpToSecDateOfLocation={this.getUpToSecDateOfLocation}
          getLiveFormatedTime={this.getLiveFormatedTime}
          tempTypeConversion={this.tempTypeConversion}
          removeLocation={this.removeLocation}
          />
        <MainView
          navState={this.state}
          appData={this.appData}
          whatDayIsIt={this.whatDayIsIt}
          />
      </div>
     );
    }
}
