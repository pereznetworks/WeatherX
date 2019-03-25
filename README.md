# TD-Project12 : SSR-0.0.1 Branch

# Status: currently on PREP TASK

  - implementing React-Router, Server-Side-Rendering Merge front-end and back-end
    - Heroku best-practice is to setup cluster-abstraction, which requires SSR for react
      - will bring many other benefits,
        - I list the ones that inspired this branch of the project
        - front-end will more closely align with Best Practices,
        - can implement better Security, better performance
        - front-end and back-end can be merged, run as 1 server

  - there are at least 3 options that I am considering...

# PREP TASK: Weigh options

- Would love to use Option B: 
  - but is the most complicated of the 3 options

- WeatherX SSR Basics: (combining options A and C):
  - implemented basic react-router for front-end
  - run a react-scripts build for react-front-end
  - configure server to import APP from 'build of react-front-end'
  - renderedAPP = renderToString(App)
  - wrap renderedAPP in an htmlTemplate
  - res.end(htmlTemplate)

- Option A:
  - https://github.com/ayroblu/ssr-create-react-app-v2
    - this works with react-scripts
      - does or can integrate other server routes,
      - can include CSS Modules, Fonts, Imgs, etc..
      - Redux, can't use Redux for this project
        - will have find a way to work without it


- Option B:
  - https://github.com/smooth-code/loadable-components/tree/master/examples/server-side-rendering
    - this is currently supported by newest version of webpack
      - would require me to eject from react-scripts
      - does or can integrate other server routes,
      - can include CSS Modules, Fonts, Imgs, etc..

- Option C:
  - https://github.com/alexnm/react-ssr/tree/basic
    - at 'basic' level does not include any css or css modules
    - would require that I run react-scripts reject
      - I cant use Redux for my project,
        - but may be able to incorporate ideas from "basic" tagged branch  
    - will need to upgrade deps, if use any of alexm's original ssr github repo:
      - some vulnerabilities, mostly the same as react-scripts 2.1.8
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

  - 1: depending on option chosen, remove react-scripts
      - using react-scripts to make managing dependencies easy
        - but either way this project needs these improvements

      - npm run eject : removes react-scripts and setups everything needed
        - will copy all the configuration files and the transitive dependencies
          - (Webpack, Babel, ESLint, etc)
        - All of the commands\scripts except `eject` will still work,
        - commands\scripts will point to the copied scripts

  - 2: setup app using react-router
      - separate step since this is a significant change,
      - it requires major changes to logic and structure of the app

  - 3: implement ssr, using webpack config and plugins

  - 4: merge back-end server
      - basically adding internal use-only routes

  - 5: merge this branch with master
      - will use issue-pull request
      - tag and preserve this branch for posterity

[Back to Master Branch](https://github.com/pereznetworks/TD-Project12/tree/master)

# License:

[MIT](https://github.com/pereznetworks/TD-Project12/blob/master/LICENSE)
