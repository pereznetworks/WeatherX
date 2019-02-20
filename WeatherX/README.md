# A Weather visualization, forecasting and mapping app

# STATUS:

# Now Working:  

## A: UI
   - 1: State and App data
      - a: state only manages UI components, true or false
      - b: now keeping all data in appData
      - c: using componentDidMount and componentWillUnmount
      - d: a TimeDisplay component with local state for each location
   - 2: backend service fully integrated into frontend app
   - 3: titleBar, locationBar, navBar3 and mainView components
      - a: or 'Enter A location' (geo-coding) is submitted
      - b: ...can use [enter], GO on mobile devices
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

# TO DO:

## A: Geolocation
    - 1: geolocation, may not implement this one
      - a: due to concerns about what is done with geolocation data

## B: Attribution
  - 1: for all of api data sources...
    - a: need to place a logo somewhere on the screen...
      - i: or a 'powered by ... ' menu that then shows...
      - ii: all of API's logos as well as underlying tech used
    - b: TomTom
      - i: also already shows up in rendered map
    - c: Forecast.io, now called DarkSky,
      - i: can be placed at bottom of weather stats layer
      - ii: and somewhere on map when radar-layer is enabled


## React Readme

[React Readme](https://github.com/pereznetworks/TD-Project12/blob/master/WeatherX/reactReadme.md)

## License:

[MIT](https://github.com/pereznetworks/TD-Project12/blob/master/LICENSE)
