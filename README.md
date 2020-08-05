# WeatherX : A Universal Multi-platform App

## Status:

- Starting fresh

  - I am making a clean break from my previous work on this project for at least 2 reasons:

    - Problems with key dependencies.

      - some of these NPM Packages had unresolved vulnerabilities or are no longer maintained

    - A lot has changed in the last 2 years

- The original project code and documentation, will be moved to a private repo.


### Project Summary

#### The App

  - A simple app that displays the current and forecasted weather conditions for a specific location.

#### Multiplatform and Universal

  - The entire app will be built with both front-end and server-side re-usable components.

  - The server-side components will be built to at least be easily adapted or ported for any production environment.

  - First, a web app version will be built.

  - Then a front-end native app will be built for Google Android, Apple macOS and iOS, and Microsoft Windows 10.

#### Open Source

  - The code for the app, will be maintained here on this public repo, to the extent possible.  Some key components and key data will have to be kept private, to ensure the security of the release versions of the app.

### Technologies to be used:

- Thanks to [Team TreeHouse](https://teamtreehouse.com), a great place for makers, breakers, engineers. Really anyone to brush-up on, gain new, or even get started in Software Development.

- This project uses [Node.js](https://nodejs.org/) and [Express.Js](https://expressjs.com/) for https server and routing.

- For database using [PostgreSQL](https://www.postgresql.org/)

- [React](https://reactjs.org/) for front-end UI

- May also use [Babel](https://babeljs.io/) and [WebPack](https://webpack.js.org/concepts) for compiling React Components

- [React Native](https://reactnative.dev/) for porting to Android, Apple and Microsoft Windows platforms

### This project integrates data from several API sources:  

- [TomTom](https://developer.tomtom.com/maps-sdk-web) - for geocoding/geolocation services

- [Forcast.io](https://darksky.net/dev/docs) - for weather forecast data

### Utility NPM packages to be used:

- [Axios](https://www.npmjs.com/package/axios) - for making api calls

- [Weather-icons](https://www.npmjs.com/package/weather-icons) - for displaying icons to indicate forecasted weather conditions

- I wrote my own Date and Time conversion methods

### Standards:

- Trying to use javascript es6, web-apps best-practices, TLS2 security and the latest web-standards!

# License:

[MIT](LICENSE)
