/* timeX - written for use with WeatherX
    methods for formatting time and getting time of any location
      tz = timezone of location = type int = offset from UTC, -12 to 12
      dateInt =  standard int in milliseconds from running new Date()
*/


timeClock(){

}

getUpToSecDateOfLocation(dateInt){
    // doing this in one place, to make code DRY, maintainable and modular
    // for whatever reason, the hourly timestamps need extra 000's to be a full timestamp
  return this.getUpToSecDateOfLocation(dateInt * 1000)
}

checkDay(dateInt, tz){
  let hrs = this.getTZhours(this.getUpToSecDateOfLocation(dateInt), tz);
  if(hrs > 7 && hrs < 17){
    return true;
  } else {
    return false;
  }
}

getTZhours(dateInt, tz){
  let utc = dateInt.getUTCHours(dateInt);
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

formatTime(hrs, mins){
  hrs = Math.floor(hrs);
  if (mins){
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

getCurrentTimeAtLocation(dateInt, tz){
  let date = this.getUpToSecDateOfLocation(dateInt);
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
  let day = today.getDay()
  let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  if (hourOfDay === '0 AM' || hourOfDay === '12 AM'){
      return daysOfWeek[day + 1];
  } else {
    return hourOfDay;
  }
}

whatDayIsIt(dateInt){
  // for whatever reason, the hourly timestamps need extra 000's to be a full timestamp
  // using location based dateInt here to simply the code
  const dateOflocation = this.getUpToSecDateOfLocation(dateInt);
  var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[dateOflocation.getDay()];
}
