# WeatherX Server

backend server to provide front-end WeatherX app with data from several external sources

[for detail on external source data and development roadmap see WeatherX app readme ](https://github.com/pereznetworks/TD-Project12/blob/master/WeatherX/README.md)


## TODO

build mongoose data models based on forecast.io current and time-machine json data samples

production and best-practice-security features needed for production build

verify that only the WeatherX front-end app can access WeatherX back-end server

## WORKING

imported my own basic express server template

added basic routing

added get /weather:location route

built custom methods for forcast.io api call using axios to make api call to a dataSource folder

using custom methods to manage data as requested, which just copies all data to an array of objects

## License:

[MIT](https://github.com/pereznetworks/TD-Project12/blob/master/LICENSE)
