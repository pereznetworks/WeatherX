// not using right now, but may switch to this in the future
// setting up dayjs for converting timestamps to time at geocoded location
import dayjs from 'dayjs-ext'
import localizableFormat from 'dayjs-ext/plugin/localizableFormat'
import timeZone from 'dayjs-ext/plugin/timeZone'
dayjs.extend(localizableFormat)
     .extend(timeZone)
     .locale('us');

// dayjs().format('LLLL')
// [LLLL	dddd, MMMM D, YYYY h:mm A] Thursday, August 16, 2018 8:02 PM
//
// const sampleDate = new Date.now();
// const timeZone = 'Europe/Berlin';
// Berlin-Timestamped = dayjs().format(sampleDate, { timeZone }) // convert to CET before formatting
//
// can now procees to do Berlin-Timestamped.getHours() .... etc..

export default dayjs;
