const tempUtils = require(`../utils`).temp;
const timeUtils = require(`../utils`).time;

module.exports.locationBar = {
  tempFahrenheit: 0, //tempUtils.tempTypeConversion(appData.fahrenheitType, locationCurrentTemp),
  tempCelsius: -34, // Math.floorappData.forecastData[indexno].data.currently.temperature,
  locationBarBackGround: 'locationBar-clearDay', // appData.locationBarBackGround[indexno]
  liveFormattedTime: `12:00 PM`, //${getLiveFormatedTime(newTime, appData.forecastData[indexno].data.offset)}
  locationCityState: null, // `${appData.locationData[indexno].data.city}, ${appData.locationData[indexno].data.province}`
  indexnoe: 0, // indexno?
  weatherIcon:{},
  fahrenheitType:true,
  fahrenheitFont:"°F",
  celsiusType:true,
  celsiusFont:"°C",
  currentConditions: 'clearDay',
  wiClass: "wi wi-day-sunny"
}
