# A Weather visualization, forecasting and mapping app

# STATUS:

 - Currently building backend service

 - UI components and testing being completed as backend service starts to deliver data
    - silly to try to fit everything in one view
    - will build multiple views and adapt app flow
    - will build more views when I have more data to work with

 - will have to leave live streaming over-lay of weather-radar over map for future version
   the main technical issue is....
    requires a paid-for api tier of service to grab continuous stream of data 
     the src code that I have built will be archived for now

# Now Working:  

## A: UI
  - 1: basic titleBar, navBar3 and mainView components
        once 'Find Me' (geo-location)
         or 'Enter A location' (geo-coding) is submitted...
  - 2: a background z-index -1 is rendered
        while current or forecast weather stats displayed
         will have appropriate cloud/rain/stormy affect animating in background

# To Do:


## A: UI
  - 1: build initial view and app flow
    - a: initial view will be a radar-layered map-view of random city
      - preferably somewhere that has rain, snow or cloud-cover
    - b: search-icon to launch search form
      - prompt 'use my location' or 'type zip, city or state'
    - c: display current weather stats and forecast for input location
      - map icon to launch radar-layered map-view
    - d: radar-layered map-view
      - icons, not buttons
      - map controls across top header
      - menu, in left corner, drops down icons to return to other views

## B: Geocoding and Geolocation
  - 1: Form present choice
     - a: 'use my location' button: uses geolocation
        - so not enabled unless user clicks this button
     - b: a text input, prompts for zip-code, city, state for geocoding
     - c: initial view will be of a random major city
        - search icon pulls up search form for geolocation, geocoding

## C: Attribution
  - 1: for all of these..
    need to place a logo somewhere on the screen...
      or a 'powered by ... ' menu that then shows...
        all of API's logos as well as underlying tech used
    - a: MapBox's
      - also already shows up in rendered map
    - b: Forecast.io, now called DarkSky,
      - can be placed at bottom of weather stats layer
      - and somewhere on map when radar-layer is enabled
    - c: TimeZoneDb,
    - d: Google Earth, ArcGIS, if I use them

## D: Integrate other API
  - 1: for MapBox
        implement more features
  - 2: Forecast.io, now called DarkSky
        verify access and start pulling and testing data
  - 3: TimeZoneDb
        verify access and start pulling and testing data
  - 4: Google Earth, if I use them
        find out if I can get satellite radar imagery via an api
  - 5: ArcGIS
        find out if I can get satellite radar imagery via an api

## React Readme

[React Readme](https://github.com/pereznetworks/TD-Project12/blob/master/WeatherX/reactReadme.md)

## License:

[MIT](https://github.com/pereznetworks/TD-Project12/blob/master/LICENSE)
