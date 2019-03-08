# A Weather visualization, forecasting and mapping app

# STATUS: finishing touches...

## A: Would like newer weather icons
  - there are a few but require a lot of re-writing
  - so will have to leave for next version

## B:following Heroku deployment best-practices
   - use es6 where possible
   - use npm git and npmrc
   - I could not find a npm package cluster abstraction for node.js/react.js apps
      - that's not for a map view
      - when trying a few
        - ran into a compile error `could not resolve cluster`
        - apparently happens when trying to load node.js `cluster` module in a browser
          - react-dom renders it's components in a browser

# Now Working:

## A: Attribution
  - 1: href link to Team Treehouse and the following API sources provided in TitleBar
    - a: TomTom
    - b: Forecast.io, now called DarkSky

## B: React State and Components
 - 1: State and AppData
    - a: state only manages UI components, basically..
      - true, render;
      - false, don't render
    - b: now keeping all data in this.appData
    - c: componentDidMount(declares and assigns default to appData key/values )
    - d: componentWillUnmount(destroys the react components and appData)

 - 2: my own custom TimeDisplay module and React components
    - a: all time and date conversion are done against..
      - utc and searched location's utc offset or timezone
    - b: displays live utc time, minus or plus utc offset of the searched location,
      - (utc offset from DarkSky using geoCoded coordinates from TomTom)
    - c: custom daytime and night based on sunsetTime and sunriseTime (from DarkSky.net)

 - 3: titleBar, locationBar, navBar3 and mainView components
    - a: titleBar always present
    - b: navBar3, toggles between input and controls form
        - i: InputControl:  text input and search submit button
        - ii: ControlsForm:  choice of Celsius. Fahrenheit or Add Location

 - 4: Input Form submit location and returns data...
    - a: then loads, locationBar shows simple current weather, with city name,
    - b: ticking clock for each location
    - c: temperature can be switched from Celsius to Fahrenheit and back
    - b: clicking anywhere on location bar, loads complete forecast view (mainView)

 - 5: a mainView, has background z-index -1
    - a: current or forecast weather stats displayed
    - b: backHome 'menu' style button loads home view
    - c: going back to home view, multiple locations and current weather still present
    - d: as long as app is not reset, can go back and forth and loads between locations

## C: Geolocation (using the location services of a device or computer)
 - 1: NOT IMPLEMENTED.

 - 2: Every effort has been made to ensure that ... NO GEOLOCATION is done in this app
    - a: due to concerns about what is done with location-data by api and others ...
      - i: API sources, Browsers platforms(like Google Chrome), and open source NPM modules, etc..
    - b: a code review has been done to make sure...
      - ii: no Geolocation of any kind is done by any code, modules or html/css used by this app.

## D: Geocoding: (converting a typed text, into a location with longitude and latitude coordinates )
 - 1: in short, all retrieved data in db is destroyed after each session

 - 2: Geocoding is done using text submitted in the navBar3 InputControls form

    - a: submitted text input is sent as AXIOS/get request to the WeatherX's back-end server
      - i: the WeatherX Server sends this text a as part of API request to TomTom's Search API

      - ii: no geo-bias is done,
          - 1: so TomTom's Search API  is only aware of the requests coming from WeatherX's backend server
          - this is why all time conversion is done against UTC and searched-location utc-offset

    - b: results are received from TomTom's Search API to the WeatherX backend server and then...

      - i: sent to DarkSky.net's API, results are received by the WeatherX backend server
      - ii: WeatherX backend server sends json response

    - c: the WeatherX front-end app receives data for the searched location from the backend server

      - ii: TomTom's geocoded data, includes searched location:
        - city, latitude and longitude, etc..        

      - iii: DarkSky's weather data results are...
          - 1: the current and 8 days of forecast weather data of searched location
          - 2: includes timezone offset, sunsetTime and sunriseTime of searched location
          - 3: all date and time conversion is by referencing UTC time and UTC offset of location searched

    - d: the WeatherX Front-End app is not really location aware, no data cached or saved

      - i: so the WeatherX front-end app does need to nor is the app aware of the user's device or browser location in any way
      - ii: the WeatherX front-end web server, includes best practice security protocols and security headers
          - 1: besides this no analysis is made of the get requests to the WeatherX Front-end app

      - iii: the WeatherX front-end app deletes all data every time the react app components are unmounted

      - iv: WeatherX back-end server data usage
          - 1: the WeatherX back-end server will accept requests only from the WeatherX Front-end host
              - a: the backend server will refuse all other connection requests  
          - 2: backend server does not do any geolocation/geoCoding of request made to it
              - a: only the text submitted by the user is geocoded
              - b: the get request to the back-end server will only included the WeatherX Front-end app's hosted server ip address and domain
          - 3: backend server deletes all data, when it sent to the WeatherX front-end app
          - 4: backend server does not keep location and weather data cached or saved to a database
               - a: this means that even duplicate requests for the same location, will need to processed again
               - b: WeatherX front-end input submit handler does validation so duplicate location are not accepts with-in the same app-session

    - e: Since the app does not need to cache or save any session data back to the server...
      - i: at present, Cookies are not used by the WeatherX front-end app
      - ii: Cookies may need to implemented ...
           - 1: to control what a browser does with the front-end app's session data...
              - after the WeatherX front-end app is supposed to unloaded
           - 2: to make sure any browsers iare forced to delete all the app's session data
      - iii: will need to used, if OAuth or GeoLocation ever is implemented in the app

## E: OAuth/login
 - 1: NOT IMPLEMENTED. (for some reason that GEO-LOCATION not implemented)

 - 2 Will keep reviewing whether to implement this feature
    - a: due to concerns about what is done with data by ...
      - i: API sources, Browsers platforms(like Google Chrome), and open source NPM modules, etc..
    - b: another factor is ...this app will be hosted by me, live, on the internet
      - so I personally ...
       - don't have the legal protections of a corporation like Google or Facebook
       - don't have the time to monitor and ensure that...
          - data and privacy protections built into modules needed for data-storage, and cookie sessions are always free of vulnerabilities
       - I will continue to monitor, see if there is a way to do these features risk-free


## React Readme

[React Readme](https://github.com/pereznetworks/TD-Project12/blob/master/WeatherX/reactReadme.md)

## License:

[MIT](https://github.com/pereznetworks/TD-Project12/blob/master/LICENSE)
