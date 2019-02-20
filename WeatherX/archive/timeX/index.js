
// wrote this but dont know if I can use it in context of reactjs components

var timeX = (function (exports){

  exports.getTZhours = function(dateInt, tz){
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

  };

  exports.formatTime = function(hrs, mins){

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
  };

  exports.getCurrentTimeAtLocation = function(dateInt, tz){
    const dateOflocation = new Date(dateInt * 1000);

    // let hrs = dateOflocation.getHours();
    // let mins = dateOflocation.getMinutes();

    let hrs = exports.getTZhours(dateOflocation, tz);

    let mins = dateOflocation.getUTCMinutes();
    if (mins < 10) {
      mins = "0" + mins;
    }

    return exports.formatTime(hrs, mins);

  };

  exports.getHourOfDay = function(dateInt, tz){
    // for whatever reason, the hourly timestamps need extra 000's to be a full timestamp
    const today = new Date(dateInt * 1000);

    let hrs = exports.getTZhours(today, tz);
    let hourOfDay = exports.formatTime(hrs);
    let day = today.getDay()
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    if (hourOfDay === '12 AM'){
        return daysOfWeek[day];
    } else {
      return hourOfDay;
    }
  };

  exports.whatDayIsIt = function(dateInt){
    // for whatever reason, the hourly timestamps need extra 000's to be a full timestamp
    const dateOflocation = new Date(dateInt * 1000);
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[dateOflocation.getDay()];
  };

  return exports;

}(timeX || { }));

export default timeX;
