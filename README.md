# TD-Project12 : My Captsone Project for Team TreeHouse FSJS Tech Degree

# Status:

  - implementing React-Router, Server-Side-Rendering Merge front-end and back-end
    - will bring many benefits, I list the ones that inspired this branch of the project
      - front-end will more closely align with Best Practices,
      - can implement better Security, better performance
      - front-end and back-end can be merged, run as 1 server

# upgrade deps, if use any of alexm's original ssr github repo:
  - some vulnerabilities
      - vulnerabilities can be fixed with some slick npm/npu commands
  - 2 npm package dependencies have dep on deprecated npm package
      - project/folder$ npm list nomnom

            ```
            ├─┬ enzyme@3.2.0
            │ └─┬ rst-selector-parser@2.2.3
            │   └─┬ nearley@2.11.0
            │     └── nomnom@1.6.2
            └─┬ webpack-cli@2.0.9
              └─┬ jscodeshift@0.4.1
                └── nomnom@1.8.1
            ```
            
  - need to upgrade to latest enzyme and webpack -cli
    - then see if everything still works
      - webpack-cli@3.3.0 seems to have removed dep on jscodeshift entirely
      - enzyme's dep, rst-selector-parser, has moved to commander.js


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
