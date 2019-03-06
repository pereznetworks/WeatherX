# A Weather visualization, forecasting and mapping app

# STATUS: finishing touches...

## A: Would like newer weather icons

## B: react-scripts issues
      - 1:  even after upgrading 2.1.5
        - i:   url: https://nodesecurity.io/advisories/786     
        - ii:  jest 23.6.0 - > all Jest sub-modules - > micromatch -> braces
        - iii: needs to upgrade braces >=2.3.1 to fix DoS attack vulnerability
              - a: need to upgrade to Jest 2.4.1
              - b: react-scripts@3.0 will require and install Jest 2.4.1
      - 2: 2  peer dependency not installed by react-scripts when running npm i
        - i:  typescript@*
              - a: react-scripts@2.5.1 -> pnp-webpack-plugin1.2.1 -> ts-pnp1.0.1 -> typescript@*
              - b: react-scripts@3.0 will be adding typescript support, will require and install this
      - 3: dependency on deprecated package
        - i  kleur@2.0.2
            - a: jest@23.6.0 -> jest-cli@23.6.0 -> prompts@0.1.14 -> kleur@2.0.2
            - b: react-scripts@3.0         
      - 4: react-scripts

# Now Working:

## A: React State and Components
 - 1: State and AppData
    - a: state only manages UI components, basically true, render; false, don't render
    - b: now keeping all data in appData
    - c: componentDidMount(delcare and set appData )
    - d: componentWillUnmount(destroys the react components and appData)
 - 2: my own custom TimeDisplay module and component
    - a: all time and date conversion are done against utc and searched location's utc offset or timezone
    - b: displays live utc time, minus or plus utc offset of the searched location, (utc offset from TomTom)
    - c: custom daytime and night based on sunsetTime and sunriseTime (from DarkSky.net)
 - 3: titleBar, locationBar, navBar3 and mainView components
    - a: titleBar always present
    - b: navBar3, toogle betwee input and controls form
        - i: InputControl:  text input and search submit button
        - ii: ControlsForm:  choice of Celsius. Fahrenheit or Add Location
 - 4: geoCoding returns data...
    - a: locationBar shows simple current weather, with city name,
    - b: ticking clock for each location
    - c: temperature can be switched from Celsius to Fahrenheit and back
    - b: clicking anywhere on location bar, loads complete forecast (mainView)
 - 5: a mainView, has background z-index -1
    - a: while current or forecast weather stats displayed
    - b: backHome 'menu' style button loads home view
    - c: going back to home view, multiple locations and current weather still present
    - d: as long as app not rest, can go back and forth and loads up to 10 locations

## B: Geolocation (using the location services of a device or computer)
 - 1: NOT IMPLEMENTED.
 - 2: Every effort has been made to ensure that...there is NO GEOLOCATION in WeatherX
    - a: due to concerns about what is done with data by api and others ...
      - i: API sources, Browsers platforms(like Google Chrome), and open source NPM modules, etc..
    - b: a code review has been done to make sure...
      - ii: no Geolocation of any kind is done by any code, modules or html/css used by this app.

## C: Geocoding: (converting a typed text, into a location with longitude and latitude coordinates )
 - 1: Geocoding is done using text submitted in the navBar3 InputControls form
    - a: submitted text input is sent to the WeatherX's back-end server
      - i: the WeatherX Server sends this text a as part of API request to TomTom's Search API
      - ii: no geo-bias is done,
          - 1: so TomTom's Search API  isonly aware of the requests coming from WeatherX's backend server
    - b: results are received from TomTom's Search API to the WeatherX backend server and then
      - i: sent to DarkSky.net's API, results are received by the WeatherX backend server
    - c: the WeatherX front-end app receives data for the searched location from the backend server
      - ii: TomTom's geocoded data, is for the searched location: city, latitude and longitude, etc..        
      - iii: DarkSky's weather data results are the current and 8 days of forecast data of searched location
          - 1: includes timezone offset, sunsetTime and sunriseTime of searched location
          - 2: all date and time conversion is by referencing UTC time and timezone of location searched
    - d: the WeatherX Front-End app is not location aware, no data cached or saved
      - i: so the WeatherX front-end app does need to nor is the app aware of the user's location in any way
      - ii: the WeatherX front-end web server, includes best practice security protocols and security headers
          - 1: besides this no analysis is made of the get requests to the WeatherX Front-end app
      - iii: the WeatherX front-end app deletes all data every time the react app components are unmounted
      - iv: WeatherX back-end server data usage
          - 1: the WeatherX back-end server will accept requests only from the WeatherX Front-end app
              - a: the backend server will refuse all other connection requests  
          - 2: backend server does not do any geolocation/geoCoding of request made to it
              - a: only the text submitted by the user is geocoded
              - b: the get request to the back-end server will only included the WeatherX Front-end app's hosted server ip address and domain
          - 3: backend server deletes all data, when it sent to the WeatherX front-end app
          - 4: backend server does not keep location and weather data cached or saved to a database
               - a: this means that even every single duplicate requests for the same location will need to processed again
    - e: Since the app does not need to cache or save any session data back to the server...
      - i: at present, Cookies are not used by the WeatherX front-end app
      - ii: Cookies may need to implemented ...
           - 1: to control what a browser does with the front-end app's session data
           - 2: to make sure whatever browser is forced to delete all the app's session data
      - iii: will need to used, if OAuth or GeoLocation ever is implemented in the app

## D: OAuth/login
 - 1: NOT IMPLEMENTED.
 - 2 Will keep reviewing whether to implement this feature
    - a: due to concerns about what is done with data by ...
      - i: API sources, Browsers platforms(like Google Chrome), and open source NPM modules, etc..

## E: Attribution
  - 1: href link to Team Treehouse and the following API sources provided in TitleBar
    - a: TomTom
    - b: Forecast.io, now called DarkSky

## React Readme

[React Readme](https://github.com/pereznetworks/TD-Project12/blob/master/WeatherX/reactReadme.md)

## License:

[MIT](https://github.com/pereznetworks/TD-Project12/blob/master/LICENSE)
