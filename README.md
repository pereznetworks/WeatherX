# TD-Project12 : My Captsone Project for Team TreeHouse FSJS Tech Degree

# Status:

  - implementing React-Router, Server-Side-Rendering Merge front-end and back-end
    - will bring many benefits, I list the ones that inspired this branch of the project
      - front-end will more closely align with Best Practices,
      - can implement better Security, better performance
      - front-end and back-end can be merged, run as 1 server

# Steps to Complete

  - 1: remove react-scripts
      - wanted react-scripts to make dependency maintenance easy
        - but this project needs these improvements

      - npm run eject : removes react-scripts and setups everything needed
        - will copy all the configuration files and the transitive dependencies
          - (Webpack, Babel, ESLint, etc)
        - All of the commands\scripts except `eject` will still work,
        - commands\scripts will point to the copied scripts

  - 2: setup app using react-router
      - separate step since this is a significant change,
      - it requires major changes to the apps logic and structure

  - 3: implement ssr, using webpack config and plugins
      - using alexm's github repo as a template
        - https://github.com/alexnm/react-ssr/tree/basic
        - going with basic, since wont be using Ruby for this project

  - 4: merge back-end server
      - basically adding internal use-only routes

  - 5: merge this branch with master
      - will use issue-pull request
      - tag and preserve this branch for posterity
      
# GitHub Project Site

(Main GitHub Project Site )https://pereznetworks.github.io/TD-Project12/

# License:

[MIT](https://github.com/pereznetworks/TD-Project12/blob/master/LICENSE)
