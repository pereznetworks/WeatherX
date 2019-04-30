// real time Clock display for locationBars

module.exports.realTimeClock = {
  time: new Date(),
  tz: -8,
  dateInt: new Date(),
  getLiveFormatedTime: function(dateInt, tz){
    // get the time, given utc hr, min and secs and the timezone, for given location
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

   this.time = this.formatTime(hrs, mins, secs);

 },
  getTZhours: function(dateInt, tz){
    // get the UTChour() of a dateInt, then account for timezone offset
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
  formatTime: function(hrs, mins, secs){
    // format the time so it can be displayed as hh:mm:ss AM/PM

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
  }
  // take a UTC Date Int and format into, 12:00 AM or 12:00 PM, for a locations timezone
  // timezone to offset or adjust from UTC time
}; // the clock

// Date and Time of Day utils

module.exports.time = {
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

  },

  getCurrentTimeAtLocation: function(dateInt, tz){ // get the time, given utc hr, min and the timezone, for given location
    let date = this.appData.date;
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

    this.appData.currentDay = [...this.appData.currentDay, this.whatDayIsIt(dateInt, tz)];
    this.appData.currentDayIndex = this.appData.currentDay.length - 1;
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if (hourOfDay === '0 AM' || hourOfDay === '12 AM'){
        nextDay = this.appData.currentDay[this.appData.currentDayIndex];
        return daysOfWeek[nextDay];
    } else {
      return hourOfDay;
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

};

// temp type conversion methods, temp comes in Fahrenheit, only converts to Celsius if neeed

module.exports.tempType = {

   tempTypeConversion: function(tempF, tempNum){
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
};
