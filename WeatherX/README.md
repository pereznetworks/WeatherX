## A Weather visualization, forecasting and mapping service

## STATUS: Currently building backend service and front-end app

## Now Working:  

A: UI
  - 1: basic header and map-controls form
  - 2: mapview container and map ReactMap core
  - 3: scroll-bars hidden
    - a: mapbox map has built-in features; zoom, scroll, pan, etc
    - b: applied to body in index.css
    - c: 2% bottom-margin for footer

B: MapBox api
  - 1: Access and rendering using basic template  
  - 2: Street and Satellite view
  - 3: switching from Street to Satellite map view

## To Do:

A: UI
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

B: Geocoding and Geolocation
  - 1: Form present choice
     - a: 'use my location' button: uses geolocation
        - so not enabled unless user clicks this button
     - b: a text input, prompts for zip-code, city, state for geocoding
     - c: initial view will be of a random major city
        - search icon pulls up search form for geolocation, geocoding

C: Attribution
  - 1: for all of these..
    need to place a logo somewhere on the screen...
      or a 'powered by ... ' menu that then shows...
        all of API's logos as well as underlying tech used
    - a: Mapbox's
      - also already shows up in rendered map
    - b: Forecast.io, now called Darksky,
      - can be placed at bottom of weather stats layer
      - and somewhere on map when radar-layer is enabled
    - c: TimeZoneDb,
    - d: Google Earth, ArcGIS, if I use them

D: Integrate other API
  - 1: Mapbox
        implement more features
  - 2: Forecast.io, now called Darksky
        verify access and start pulling and testing data
  - 3: TimeZoneDb
        verify access and start pulling and testing data
  - 4: Google Earth, if I use them
        find out if I can get satellite radar imagery via an api
  - 5: ArcGIS
        find out if I can get satellite radar imagery via an api

## Born from the react bootstrapped environment

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# License:

[MIT](https://github.com/pereznetworks/TD-Project12/blob/master/LICENSE)
