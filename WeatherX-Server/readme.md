# WeatherX Server

backend server to provide front-end WeatherX app with data from several external sources

[for detail on external source data and development roadmap see WeatherX app readme ](https://github.com/pereznetworks/TD-Project12/blob/master/WeatherX/README.md)


## TODO

build mongoose data models based on forecast.io current and time-machine json data samples

as I go, am adding basic production env and best-practice-security features needed for production build

build 'forecast-enabled' mapbox datasets and tile-sets, and animations based on forecast.io data

build a mapbox map-style based on forecast-enabled mapbox datasets and tile-sets

add forecast-enabled mapbox map-style url to get /weather api

test from WeatherX front-end app

add auth/perms to verify that only the WeatherX front-end app can access WeatherX back-end server

## WORKING

imported my own basic express server template

added basic routing

added get /weather:location route

built custom methods for forcast.io api call using axios to make api call to a dataSource folder

using custom methods to manage data as requested, which just copies all data to an array of objects

added my mongoose client and my mongoose document methods to dataSource folder from project 11

added full module pattern folder structure to dataSource folder

## License:

[MIT](https://github.com/pereznetworks/TD-Project12/blob/master/LICENSE)
