// real time Clock display for locationBars

// an object sets an 1000 milliscond interval,
// for each interval, sets formated time from a new Date() adjusted for a locations timezone

// take a UTC Date Int and format into, 12:00 AM or 12:00 PM, for a locations timezone
// timezone to offset or adjust from UTC time
const realTimeClock = {
  time: 0,
  tz: -8,
  dateInt: 0,
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

   return this.formatTime(hrs, mins, secs);

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
};

// for each div of class 'locationBar-div',
// adjust the realTimeClock.time using that locations timezone offset
const setTime = locationArray => {

  var arrayOfLB = Array.from(document.getElementsByClassName("locationBar-div"));
  arrayOfLB.forEach(function(item, index){
    const tz = document.getElementById(`locationTime${index}`).attributes.tz.value;
    document.getElementById(`locationTime${index}`).innerHTML = realTimeClock.getLiveFormatedTime(new Date(), tz);
  });
  
};
