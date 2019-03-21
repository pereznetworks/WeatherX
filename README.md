# TD-Project12 : My Captsone Project for Team TreeHouse FSJS Tech Degree

# GitHub Project Site : https://pereznetworks.github.io/TD-Project12/

# Status: This branch is for implementing Server-Side-Rendering for the WeatherX front-end app.

  - Goal: Switch to SSR, will bring many benefits, below I list a few
    - front-end will more closely align with Best Practices, can implement better Security, better performance
    - front-end and back-end can be merged into run as 1 server

# Steps to Complete

  - 1: remove the training wheels =)
    - npm run eject : removes react-scripts and setups everything needed
    - will copy all the configuration files and the transitive dependencies
      - (Webpack, Babel, ESLint, etc)
    - All of the commands\scripts except `eject` will still work,
      - commands\scripts will point to the copied scripts

  - 2: setup app using react-router
      - this is a significant change,
      - it requires some changes to the apps logic and structure

  - 3: implement ssr, using webpack config and plugins
      - https://github.com/alexnm/react-ssr/tree/basic

  - 4: merge back-end server
      - basically adding internal use-only routes

  - 5: merge this branch with master
      - will use issue-pull request

# License:

[MIT](https://github.com/pereznetworks/TD-Project12/blob/master/LICENSE)
