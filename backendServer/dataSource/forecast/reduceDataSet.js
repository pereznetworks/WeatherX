/* reduceDataSet module v.0.0.1
 * this reduces this extenisve dataset returned by darsky.net to just the data that WeatherX uses
*/

const reduceForecastDataSet = (forecast) => {

  const reducedDataSet = {
         latitude: forecast.latitude,
         longitude: forecast.longitude,
         timezone: forecast.timezone,
         currently: {
          time: forecast.currently.time,
          summary: forecast.currently.summary,
          icon: forecast.currently.icon,
          temperature: forecast.currently.temperature
         },
         hourly: {
          summary: forecast.hourly.summary,
          icon: forecast.hourly.icon,
         },
         daily: {
          summary: forecast.daily.summary,
          icon: forecast.daily.icon,
         },
         flags: forecast.flags,
         offset: forecast.offset
  };

  console.log(`reducing, first stage complete... `);

  reducedDataSet.hourly.data = forecast.hourly.data.map((item, index) => {
     return {
       time:item.time,
       summary:item.summary,
       icon:item.icon,
       temperature:item.temperature
     }
  });

  console.log(`reducing, second stage complete... `);

  reducedDataSet.daily.data = forecast.daily.data.map((item, index) => {
     return {
       time:item.time,
       summary:item.summary,
       icon:item.icon,
       sunriseTime:item.sunriseTime,
       sunsetTime:item.sunsetTime,
       moonPhase:item.moonPhase,
       temperatureHigh:item.temperatureHigh,
       temperatureHighTime: item.temperatureHighTime,
       temperatureLow:item.temperatureLow,
       temperatureLowTime: item.temperatureLowTime
     }
  });

  console.log(`reducing, third stage complete... `);

  return reducedDataSet;
};

module.exports.reduceForecastDataSet = reduceForecastDataSet;
