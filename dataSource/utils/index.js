// Date and Time of Day utils

/* changes to timeDate methods: are not object methods
  getCurrentTimeAtLocation - instead this.appData.date, now takes a locationTime,
  getHourOfDay - instead of hourofDay as a string,
      now returns an object - {hourOfDay: '', currentDay: currentDayArray}

*/
module.exports.timeDate = {
  // may use dayJs-ext or moment0-timezone for timezone time adjustment
  // For now, using my own custom code to adjust from UTC to timezone offset of location

  getUpToSecDateOfLocation: function(dateInt){
    // for whatever reason, the hourly timestamps need extra 000's to be a full timestamp
   return new Date(dateInt * 1000);
 },

  checkDay: function(dateInt, tz, sunset, sunrise){
    // dont need actual current time
    // need to calc whether for a given hour of the day...
    // for specific location,
    // given that timezone sunrise and sunset time
    // ..is it nighttime or daytime

    // getTZhours usess getUTCHours, which returns a 36 hr/day hour
    // but here I am correting for a 24 hour/day hour
    // so 24 hundred hours becomes, 0 hours, etc...
    const correct24hour = hrX => {
      if (hrX === 24){
       return 0;
      } else if (hrX > 24){
       return hrX - 24;
     } else {
       return hrX;
     }
    };

    let tzHrs = correct24hour(this.getTZhours(this.getUpToSecDateOfLocation(dateInt), tz));
    let tzSunset = correct24hour(this.getTZhours(this.getUpToSecDateOfLocation(sunset), tz));
    let tzSunrise = correct24hour(this.getTZhours(this.getUpToSecDateOfLocation(sunrise), tz));

    if(tzHrs > tzSunset || tzHrs <= tzSunrise ){
      return false;  // so it's night time in this timezone
    } else if ( tzHrs <= tzSunset && tzHrs >= tzSunrise) {
      return true; // so it's still daytime in this timezone
    }
  },

  getTZhours: function(dateInt, tz){ // get the UTChour() of a dateInt, then account for timezone offset


    let utc = (this.getUpToSecDateOfLocation(dateInt)).getUTCHours();
    let hrs;

    if (tz < 0){
      tz = Math.abs(tz);
      if (utc < 12 ){
        utc = utc + 24;
        hrs = utc - tz;
      } else if (utc === 0){
        hrs = utc - tz;
        hrs = 24 - tz;
      } else {
        hrs = utc - tz;
      }

    } else {
        hrs = utc + tz;
    }

    return hrs; // is a 36 hours/day hour

  },

  formatTime: function(hrs, mins, secs){  // format the time so it can be displayed as hh:mm:ss AM/PM

    hrs = Math.floor(hrs); // every once in awhile getTZhours return a floating point hour, 10.5 (??)

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
  },

  getLiveFormatedTime: function(dateInt, tz){ // get the time, given utc hr, min and secs and the timezone, for given location
    let date = this.getUpToSecDateOfLocation(dateInt);
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

  },

  getCurrentTimeAtLocation: function(locationTime, tz){ // get the time, given utc hr, min and the timezone, for given location
    let date = this.getUpToSecDateOfLocation(locationTime);
    let hrs, mins;

    hrs = this.getTZhours(date, tz);

    mins = date.getUTCMinutes();
    if (mins < 10) {
      mins = "0" + mins;
    }

    return this.formatTime(hrs, mins);

  },

  getHourOfDay: function(dateInt, tz){ // return the hours of the day, for 00 hours, return day of week
    // get hour of day, given utc hour and timezone offset for a given location
    // if it's 12 AM, or midnight, return the day of week instead

    // used in hourly conditions mainView table component
    const today = this.getUpToSecDateOfLocation(dateInt);

    let hrs = this.getTZhours(today, tz);
    let hourOfDay = this.formatTime(hrs);
    let nextDay;

    const currentDayIndex = this.whatDayIsIt(dateInt, tz);
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if (hourOfDay === '0 AM' || hourOfDay === '12 AM'){
        nextDay = currentDay[currentDayIndex];
        return daysOfWeek[nextDay];
    } else {
        return hourOfDay
    }
  },

  whatDayIsIt: function(dateInt, utcOffSet){ // what day is it for a given timezone, based on UTC time

    // returns a timeStamp using the dateInt * 1000
    // the forecast.io timestamps needs to be * 1000 to be converted into a Date timeStamp
    // this.getUpToSecDateOfLocation(1550674800)
    const timeStamp = this.getUpToSecDateOfLocation(dateInt);

    let dayOfWeek;
    let utcHours = timeStamp.getUTCHours();

    if (utcOffSet === 0){

        dayOfWeek = timeStamp.getUTCDay();

    } else if (utcOffSet < 0){
          utcOffSet = Math.abs(utcOffSet);
          if ( (utcHours - utcOffSet) <  0 ){
            if (timeStamp.getUTCDay() === 0){
              dayOfWeek = 7 - 1;
            } else {
              dayOfWeek = timeStamp.getUTCDay() - 1;
            }
          } else {
            dayOfWeek = timeStamp.getUTCDay();
          }
    } else {
      if ( (utcHours + utcOffSet) >=  24 ){
        if (timeStamp.getUTCDay() === 6){
          dayOfWeek = 0;
        } else {
          dayOfWeek = timeStamp.getUTCDay() + 1;
        }
      } else {
        dayOfWeek = timeStamp.getUTCDay();
      }
    }

    // console.log(timeStamp, utcHours, utcOffSet, dayOfWeek);

    return dayOfWeek;


    // use the following array wherever calling this function
    // let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  },

  mainView: function(data){ // set appropriate background based on current weather condition

    let day = this.checkDay(data.currently.time, data.offset, data.daily.data[0].sunsetTime, data.daily.data[0].sunriseTime );
    let icon = data.currently.icon;

       if ( icon === 'cloudy' && day){
          return "cloudyDay";
        } else if ( icon === 'cloudy' && !day){
           return "cloudyNight";
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
  },

  locationBar: function(data){ // set appropriate background based on current weather condition

    let day = this.checkDay(data.currently.time, data.offset, data.daily.data[0].sunsetTime, data.daily.data[0].sunriseTime);
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

};

/* changes to convertTemp methods : are now object methods
   call .toCelsius, only if have a Fahrenheit temp
   call .toFahrenheit, only if have a Celsius temp
*/
module.exports.convertTemp = {

  toCelsius: function(tempNum){
      return Math.round((tempNum - 32 ) / 1.8);
  },
  toFahrenheit: function(tempNum){
      return Math.round((tempNum *  1.8) + 32);
  }
}

// set background for locationBar and mainView

module.exports.setBackground = {
  mainView: function(data){ // set appropriate background based on current weather condition

    let day = this.checkDay(data.currently.time, data.offset, data.daily.data[0].sunsetTime, data.daily.data[0].sunriseTime );
    let icon = data.currently.icon;

       if ( icon === 'cloudy' && day){
          return "cloudyDay";
        } else if ( icon === 'cloudy' && !day){
           return "cloudyNight";
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
  },
  locationBar: function(data){ // set appropriate background based on current weather condition

    let day = this.checkDay(data.currently.time, data.offset, data.daily.data[0].sunsetTime, data.daily.data[0].sunriseTime);
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
  }

module.exports.getWiClass = function(icon, day){
  // for mapping locationData, inserts currentConditions into a LocationBar Div, inserted into grid

    let wiClass;
      if ( icon === 'cloudy'  && day){
        wiClass = "wi wi-day-cloudy";

      } else if ( icon === 'cloudy'  && !day){
        wiClass = "wi wi-night-alt-cloudy";

      } else if ( icon === 'fog' && day){
        wiClass = "wi wi-day-fog";

      } else if ( icon === 'fog' && !day){
        wiClass = "wi wi-night-fog";

      } else if ( icon === 'partly-cloudy-day'){
        wiClass = "wi wi-day-sunny-overcast";

      } else if (icon === 'partly-cloudy-night'  ){
        wiClass = "wi wi-night-alt-cloudy";

      } else if ( icon === 'rain' && day){
        wiClass = "wi wi-day-rain";

      } else if ( icon === 'rain' && !day){
        wiClass = "wi wi-night-alt-rain";

      } else if ( icon === 'clear-day' && day ){
        wiClass = "wi wi-day-sunny";

      } else if ( icon === 'clear' && day ){
        wiClass = "wi wi-day-sunny";

      } else if ( icon === 'clear-day' && !day ){
        wiClass = "wi wi-night-clear";

      } else if ( icon === 'clear' && !day ){
        wiClass = "wi wi-night-clear";

      } else if (icon === 'clear-night'){
        wiClass = "wi wi-night-clear";

      } else if ( icon === 'snow' && day ){
        wiClass = "wi wi-day-snow";

      }  else if ( icon === 'snow' && !day ){
        wiClass = "wi wi-night-alt-snow";

      } else if ( icon === 'scattered-showers' && day){
        wiClass = "wi wi-day-showers";

      }else if ( icon === 'scattered-showers' && !day){
        wiClass = "wi wi-night-alt-showers";

      } else if ( icon === 'thunder' && day){
        wiClass = "wi wi-day-thunderstorm";

      }  else if ( icon === 'thunder' && !day){
        wiClass = "wi wi-night-alt-thunderstorm";

      } else if ( icon === 'wind' && day){
        wiClass = "wi wi-day-windy";

      } else if ( icon === 'wind' && !day){
        wiClass = "wi wi-night-alt-cloudy-gusts";
      } else {
        wiClass = "wi wi-day-sunny";
      }

      return wiClass;
  };

module.exports.displayNewLocFirst = function(){
  // reverse the array of locationBar grid items, so new locations appear at the top

      arrayOfElements.reverse();
      return arrayOfElements;
  };
