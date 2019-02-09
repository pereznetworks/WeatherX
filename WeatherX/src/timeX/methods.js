/* timeX - written for use with WeatherX
    methods for formatting time and getting time of any location
      tz = timezone of location : int : offset -12 to 12
      dateInt = dateInt from new Date()
*/

function getTZhours(dateInt, tz){
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

function formatTime(hrs, mins){

  if (mins){
    if (hrs > 12){
       hrs = hrs - 12;
       return `${hrs}:${mins} PM`;
    } else if (hrs > 24){
       hrs = hrs - 24;
       return `${hrs}:${mins} PM`;
    } else if(hrs === 24){
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

function getCurrentTimeAtLocation(dateInt, tz){
  const dateOflocation = new Date(dateInt * 1000);

  // let hrs = dateOflocation.getHours();
  // let mins = dateOflocation.getMinutes();

  let hrs = getTZhours(dateOflocation, tz);

  let mins = dateOflocation.getUTCMinutes();
  if (mins < 10) {
    mins = "0" + mins;
  }

  return formatTime(hrs, mins);

}

function getHourOfDay(dayInt, tz){
  // for whatever reason, the hourly timestamps need extra 000's to be a full timestamp
  const today = new Date(dayInt * 1000);

  let hrs = getTZhours(today, tz);
  let hourOfDay = formatTime(hrs);
  let day = today.getDay()
  let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  if (hourOfDay === '12 AM'){
      return daysOfWeek[day];
  } else {
    return hourOfDay;
  }
}

function whatDayIsIt(dateInt){
  // for whatever reason, the hourly timestamps need extra 000's to be a full timestamp
  const dateOflocation = new Date(dateInt * 1000);
  var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[dateOflocation.getDay()];
}

export {
  getTZhours,
  formatTime,
  getCurrentTimeAtLocation,
  getHourOfDay,
  whatDayIsIt,
}
