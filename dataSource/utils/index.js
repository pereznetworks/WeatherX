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
    // returns a timeStamp using the dateInt * 1000
    // the forecast.io timestamps needs to be * 1000 to be converted into a Date timeStamp
    // this.getUpToSecDateOfLocation(1550674812) -> 1550674812000
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

    let timeStamp = this.getUpToSecDateOfLocation(dateInt);
    let sunSet = this.getUpToSecDateOfLocation(sunset);
    let sunRise = this.getUpToSecDateOfLocation(sunrise);

    const correct24hour = hrX => {
      if (hrX === 24){
       return 0;
      } else if (hrX > 24){
       return hrX - 24;
     } else {
       return hrX;
     }
    };

    let tzHrs = correct24hour(this.getTZhours(timeStamp, tz));
    let tzSunset = correct24hour(this.getTZhours(sunSet, tz));
    let tzSunrise = correct24hour(this.getTZhours(sunRise, tz));

    if(tzHrs > tzSunset || tzHrs <= tzSunrise ){
      return false;  // so it's night time in this timezone
    } else if ( tzHrs <= tzSunset && tzHrs >= tzSunrise) {
      return true; // so it's still daytime in this timezone
    }
  },

  getTZhours: function(dateInt, tz){ // get the UTChour() of a dateInt, then account for timezone offset

    let utc = dateInt.getUTCHours();
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
    // let initialDate = this.getUpToSecDateOfLocation(locationTime);
    let nowDate = new Date();


    let hrs, mins, secs;

    hrs = this.getTZhours(nowDate, tz);

    mins = nowDate.getUTCMinutes();
    if (mins < 10) {
      mins = "0" + mins;
    }

    secs = nowDate.getUTCSeconds();
    if (secs < 10) {
      secs = "0" + secs;
    }

    return this.formatTime(hrs, mins, secs);

  },

  getHourOfDay: function(dateInt, tz){ // return the hours of the day, for 00 hours, return day of week
    // get hour of day, given utc hour and timezone offset for a given location
    // if it's 12 AM, or midnight, return the day of week instead

    // used in hourly conditions mainView table component
    const today = this.getUpToSecDateOfLocation(dateInt);

    let hrs = this.getTZhours(today, tz);
    let hourOfDay = this.formatTime(hrs);
    // let nextDay;

    const currentDayIndex = this.whatDayIsIt(dateInt, tz);
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if (hourOfDay === '0 AM' || hourOfDay === '12 AM'){
        return daysOfWeek[currentDayIndex];
    } else {
        return hourOfDay;
    }
  },

  whatDayIsIt: function(dateInt, utcOffSet){ // what day is it for a given timezone, based on UTC time

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

       if ( icon === 'cloudy' ){
          return "cloudyDay";
        } else if ( icon === 'cloudy' ){
           return "cloudyNight";
        } else if ( icon === 'fog' ){
          return "foggyDay";
        } else if ( icon === 'fog' ){
          return "foggyNight";
        } else if ( icon === 'partly-cloudy-day'){
          return "partlyCloudyDay";
        } else if ( icon === 'partly-cloudy-night'){
          return "partlyCloudyNight";
        } else if ( icon === 'rain' ){
          return "rainyDay";
        } else if ( icon === 'rain' ){
          return "rainyNight";
        } else if ( icon === 'clear-day' ){
          return "clearDay";
        } else if ( icon === 'clear-night' ){
          return "clearNight";
        } else if ( icon === 'snow' ){
          return "snowyDay";
        } else if ( icon === 'snow' ){
          return "snowyNight";
        } else if ( icon === 'scattered-showers'  ){
          return "rainyDay";
        } else if ( icon === 'scattered-showers'  ){
          return "rainyNight";
        } else if ( icon === 'thunder'  ){
          return "thunderDay";
        } else if ( icon === 'thunder'  ){
          return "thunderNight";
        } else if ( icon === 'wind'  ){
          return "windyDay";
        } else if ( icon === 'wind'  ){
          return "windyNight";
        }
  },

  locationBar: function(data){ // set appropriate background based on current weather condition

    let day = this.checkDay(data.currently.time, data.offset, data.daily.data[0].sunsetTime, data.daily.data[0].sunriseTime);
    let icon = data.currently.icon;

       if ( icon === 'cloudy' ){
          return "locationBar-cloudyDay";
        } else if ( icon === 'cloudy' ){
           return "locationBar-cloudyNight";
        } else if ( icon === 'fog' ){
          return "locationBar-foggyDay";
        } else if ( icon === 'fog' ){
          return "locationBar-foggyNight";
        } else if ( icon === 'partly-cloudy-day'){
          return "locationBar-partlyCloudyDay";
        } else if ( icon === 'partly-cloudy-night'){
          return "locationBar-partlyCloudyNight";
        } else if ( icon === 'rain' ){
          return "locationBar-rainyDay";
        } else if ( icon === 'rain' ){
          return "locationBar-rainyNight";
        } else if ( icon === 'clear-day' ){
          return "locationBar-clearDay";
        } else if ( icon === 'clear-night' ){
          return "locationBar-clearNight";
        } else if ( icon === 'snow' ){
          return "locationBar-snowyDay";
        } else if ( icon === 'snow' ){
          return "locationBar-snowyNight";
        } else if ( icon === 'scattered-showers'  ){
          return "locationBar-rainyDay";
        } else if ( icon === 'scattered-showers'  ){
          return "locationBar-rainyNight";
        } else if ( icon === 'thunder'  ){
          return "locationBar-thunderDay";
        } else if ( icon === 'thunder'  ){
          return "locationBar-thunderNight";
        } else if ( icon === 'wind'  ){
          return "locationBar-windyDay";
        } else if ( icon === 'wind'  ){
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
};

// set background for locationBar and mainView
// this is now done server-side

// module.exports.setBackground = {
//   mainView: function(data){ // set appropriate background based on current weather condition
//
//     let day = this.checkDay(data.currently.time, data.offset, data.daily.data[0].sunsetTime, data.daily.data[0].sunriseTime );
//     let icon = data.currently.icon;
//
//        if ( icon === 'cloudy' ){
//           return "cloudyDay";
//         } else if ( icon === 'cloudy' ){
//            return "cloudyNight";
//         } else if ( icon === 'fog' ){
//           return "foggyDay";
//         } else if ( icon === 'fog' ){
//           return "foggyNight";
//         } else if ( icon === 'partly-cloudy-day'){
//           return "partlyCloudyDay";
//         } else if ( icon === 'partly-cloudy-night'){
//           return "partlyCloudyNight";
//         } else if ( icon === 'rain' ){
//           return "rainyDay";
//         } else if ( icon === 'rain' ){
//           return "rainyNight";
//         } else if ( icon === 'clear-day' ){
//           return "clearDay";
//         } else if ( icon === 'clear-night' ){
//           return "clearNight";
//         } else if ( icon === 'snow' ){
//           return "snowyDay";
//         } else if ( icon === 'snow' ){
//           return "snowyNight";
//         } else if ( icon === 'scattered-showers'  ){
//           return "rainyDay";
//         } else if ( icon === 'scattered-showers'  ){
//           return "rainyNight";
//         } else if ( icon === 'thunder'  ){
//           return "thunderDay";
//         } else if ( icon === 'thunder'  ){
//           return "thunderNight";
//         } else if ( icon === 'wind'  ){
//           return "windyDay";
//         } else if ( icon === 'wind'  ){
//           return "windyNight";
//         }
//   },
//   locationBar: function(data){ // set appropriate background based on current weather condition
//
//     let day = this.checkDay(data.currently.time, data.offset, data.daily.data[0].sunsetTime, data.daily.data[0].sunriseTime);
//     let icon = data.currently.icon;
//
//        if ( icon === 'cloudy' ){
//           return "locationBar-cloudyDay";
//         } else if ( icon === 'cloudy' ){
//            return "locationBar-cloudyNight";
//         } else if ( icon === 'fog' ){
//           return "locationBar-foggyDay";
//         } else if ( icon === 'fog' ){
//           return "locationBar-foggyNight";
//         } else if ( icon === 'partly-cloudy-day'){
//           return "locationBar-partlyCloudyDay";
//         } else if ( icon === 'partly-cloudy-night'){
//           return "locationBar-partlyCloudyNight";
//         } else if ( icon === 'rain' ){
//           return "locationBar-rainyDay";
//         } else if ( icon === 'rain' ){
//           return "locationBar-rainyNight";
//         } else if ( icon === 'clear-day' ){
//           return "locationBar-clearDay";
//         } else if ( icon === 'clear-night' ){
//           return "locationBar-clearNight";
//         } else if ( icon === 'snow' ){
//           return "locationBar-snowyDay";
//         } else if ( icon === 'snow' ){
//           return "locationBar-snowyNight";
//         } else if ( icon === 'scattered-showers'  ){
//           return "locationBar-rainyDay";
//         } else if ( icon === 'scattered-showers'  ){
//           return "locationBar-rainyNight";
//         } else if ( icon === 'thunder'  ){
//           return "locationBar-thunderDay";
//         } else if ( icon === 'thunder'  ){
//           return "locationBar-thunderNight";
//         } else if ( icon === 'wind'  ){
//           return "locationBar-windyDay";
//         } else if ( icon === 'wind'  ){
//           return "locationBar-windyNight";
//         }
//   }
//   }

// select the appropriate weather-icon, based on forecast condition key-
module.exports.getWiClass = function(icon, day){
  // for mapping locationData, inserts currentConditions into a LocationBar Div, inserted into grid

    let wiClass;
      if ( icon === 'cloudy'  ){
        wiClass = "wi wi-day-cloudy";

      } else if ( icon === 'cloudy'  ){
        wiClass = "wi wi-night-alt-cloudy";

      } else if ( icon === 'fog' ){
        wiClass = "wi wi-day-fog";

      } else if ( icon === 'fog' ){
        wiClass = "wi wi-night-fog";

      } else if ( icon === 'partly-cloudy-day'){
        wiClass = "wi wi-day-sunny-overcast";

      } else if (icon === 'partly-cloudy-night'  ){
        wiClass = "wi wi-night-alt-cloudy";

      } else if ( icon === 'rain' ){
        wiClass = "wi wi-day-rain";

      } else if ( icon === 'rain' ){
        wiClass = "wi wi-night-alt-rain";

      } else if ( icon === 'clear-day'  ){
        wiClass = "wi wi-day-sunny";

      } else if ( icon === 'clear'  ){
        wiClass = "wi wi-day-sunny";

      } else if ( icon === 'clear-day'  ){
        wiClass = "wi wi-night-clear";

      } else if ( icon === 'clear'  ){
        wiClass = "wi wi-night-clear";

      } else if (icon === 'clear-night'){
        wiClass = "wi wi-night-clear";

      } else if ( icon === 'snow'  ){
        wiClass = "wi wi-day-snow";

      }  else if ( icon === 'snow'  ){
        wiClass = "wi wi-night-alt-snow";

      } else if ( icon === 'scattered-showers' ){
        wiClass = "wi wi-day-showers";

      }else if ( icon === 'scattered-showers' ){
        wiClass = "wi wi-night-alt-showers";

      } else if ( icon === 'thunder' ){
        wiClass = "wi wi-day-thunderstorm";

      }  else if ( icon === 'thunder' ){
        wiClass = "wi wi-night-alt-thunderstorm";

      } else if ( icon === 'wind' ){
        wiClass = "wi wi-day-windy";

      } else if ( icon === 'wind' ){
        wiClass = "wi wi-night-alt-cloudy-gusts";
      } else {
        wiClass = "wi wi-day-sunny";
      }

      return wiClass;
  };

// reverse an array so new elements appear first
module.exports.displayNewLocFirst = function(arrayOfElements){

      arrayOfElements.reverse();
      return arrayOfElements;
  };

// generate and return a random alphanumeric string using basic Math methods
module.exports.getUuid = function(){
  const getRandomNum = (max) => {
    return Math.floor((Math.random() * max) + 1);
  };

  const getRandomLtr = () => {
    // array of letter arrays
    const letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    // console.log(letters.length)
    // randomly select letter from randonly selected upper or lowercase letter array
    return letters[getRandomNum(51) - 1 ];
  };

  const ltrNum = ['A', 0, 'B', 1, 'C', 3];

  let alphaNumrc = '';

  for (let i = 0; i <= 12; i++ ){
    if (isNaN(parseInt(ltrNum[getRandomNum(6) - 1]))){
      // console.log(`index:${i}\nletter: ${alphaNumrc}`);
      alphaNumrc = `${alphaNumrc}${getRandomLtr()}`;
    } else {
      // console.log(`index:${i}\nnumber: ${alphaNumrc}`);
      alphaNumrc = `${alphaNumrc}` + `${getRandomNum(100)}`;
    }
  }

  return alphaNumrc;
};
