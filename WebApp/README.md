#To Run WebApp

- install
    1. ensure you are in the WebApp directory
    2. `npm install`
    3. `bower install`
- run
    `gulp`


    Demo sites:

    * http://dev.thebedroomlaboratory.com/~martin/brewmonitor/ (PHP - Stable)
    * http://dev.thebedroomlaboratory.com/brewmonitor/ (Node - Unstable)


    ### REST API Format
    The Api will follow the below format

    * Node.js Backend
      * http://dev.thebedroomlaboratory.com/brewmonitor/api/v1.0/help
      * http://dev.thebedroomlaboratory.com/brewmonitor/api/v1.0/list (GET)
        * URL parameters optional, e.g.
        * http://dev.thebedroomlaboratory.com/brewmonitor/api/v1.0/list?devid=1&userid=1
      * http://dev.thebedroomlaboratory.com/brewmonitor/api/v1.0 (POST)
        * `{ "userid": 0, "devid": 0, "temps": [{"sensid": 0, "temp": 20.2}, {"sensid": 1, "temp": 20.8}], "timestamp": "2014-11-15T16:56:08.506Z" }`

    ### Installation and running

    First thing to do is to clone this repository. All paths are given relative to the root of the repository. From here on it is also assumed that the root of the commands are run from inside the Webapp directory.
    1. Install the required node modules with `npm install`.
    2. Install the required bower dependencies `bower install`
    3. Install Gulp globally with `npm install -g gulp`
    4. Run the application using the default gulp task with the command `gulp`

    ### To Do
    1. [x] create basic express server and angular app
        a. [x] serve basic angular app
        b. [x] include routes for readings (starting with dummy data)
        c. [x] graph dummy data
    2. [x] create basic gulp task
    3. [ ] replace dummy data with mongodb
        a. [x] create model for readings
        b. [ ] create basic CRUD operations
    4. [ ] remove bower dependiences (should aim to use npm modules)
    5. [ ] incorporate Webpack/browserify
        a. [ ] choose which framework to use
        b. [ ] create gulp build task to build using Webpack/browserify
    6. [ ] Create and enforce coding style
        a. [ ] incorporate jshint
        b. [ ] incorporate Tests
    7. [ ] Incorporate TDD/BDD
        a. [ ] investigate preferred testing framework
        b. [ ] create `gulp test` task
    8. [ ] create automated build
        a. [ ] create travisCi build
        b. [ ] agree on build rules
        c. [ ] fail build on agreed rules
        d. [ ] auto deploy to test server on build success
    - Stretch goals
        [ ] investigare [cucumber](https://cukes.info/) for Human readable testing
        [ ] enforce testing style guide
        [ ] incorporate e2e tests