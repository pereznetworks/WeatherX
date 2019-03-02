# WeatherX Server - Mongod

backend server to provide front-end WeatherX app with data from several external sources

[for detail on external source data and development roadmap see WeatherX app readme ](https://github.com/pereznetworks/TD-Project12/blob/master/WeatherX/README.md)


## TODO

production and best-practice-security features needed for production build

## WORKING

imported my own basic express server template

added basic routing

added get /weather:location route

switched to Sequelize@4, SQLite@3 and Sequelize-cli
  Mongod starts a server with a listening port
    the extra encryotion and security measures needed by Mongod make things more complicated
  While this would be fun, Sequelize is good enough for now

built custom methods for forcast.io api call using Axios to make api call to a dataSource folder

using custom methods to manage data as requested, which just copies all data to an array of objects

verified that only the WeatherX front-end app can access WeatherX back-end server

## License:

[MIT](https://github.com/pereznetworks/TD-Project12/blob/master/LICENSE)
