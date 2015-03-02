### Installation and running
First thing to do is to clone this repository. All paths are given relative to the root of the repository. From here on it is also assumed that the root of the commands are run from inside the Webapp directory.

1. Install the required node modules with `npm install`.
2. Install the required bower dependencies `bower install`.
3. Install Gulp globally with `npm install -g gulp`.
4. Run the application using the default gulp task with the command `gulp`.

###Gulp Tasks
Currently there are only a few gulp tasks that do the basics but these will grow and evolve over time:

1. `gulp` - the default task , copy's to dev directory and starts the server
2. `gulp copy` - currently copys the html and js files and is called as part of the default task
3. `gulp populateDB` - populates the mongo db with the contents of [dummydata.js](https://github.com/thebedroomlaboratory/BrewMonitor/blob/basic-mean/WebApp/server/brewmonitor/dummydata.js)
    
### REST API Format
The Api will follow the below format

* Node.js Backend
  * http://dev.thebedroomlaboratory.com/brewmonitor/api/v1.0/help
  * http://dev.thebedroomlaboratory.com/brewmonitor/api/v1.0/list (GET)
  * URL parameters optional, e.g.
    * http://dev.thebedroomlaboratory.com/brewmonitor/api/v1.0/list?devid=1&userid=1
    * http://dev.thebedroomlaboratory.com/brewmonitor/api/v1.0 (POST)
    
       ```
      { 
         "userid": 0, 
         "devid": 0, 
         "temps": [
                   {"sensid": 0, "temp": 20.2}, 
                   {"sensid": 1, "temp": 20.8}
                  ], 
        "timestamp": "2014-11-15T16:56:08.506Z" 
    }
      ```


    ### To Do
1. [x] create basic express server and angular app
   - [x] serve basic angular app
   - [x] include routes for readings (starting with dummy data)
   - [x] graph dummy data
2. [x] create basic gulp task
   - [x] replace dummy data with mongodb
   - [x] create gulp task to populate db with data for development
   - [x] create model for readings
   - [ ] create basic CRUD operations
3. [ ] include Basic local and Social Auth
   - [ ] local
   - [ ] facebook
   - [ ] Google
   - [ ] twitter
4. [ ] remove bower dependiences (should aim to use npm modules)
5. [ ] incorporate Webpack/browserify
   - [ ] choose which framework to use
   - [ ] create gulp build task to build using Webpack/browserify
6. [ ] Create and enforce coding style
   - [ ] incorporate jshint
   - [ ] incorporate Tests
7. [ ] Incorporate TDD/BDD
   - [ ] investigate preferred testing framework
   - [ ] create `gulp test` task
8. [ ] create automated build
   - [ ] create travisCi build
   - [ ] agree on build rules
   - [ ] fail build on agreed rules
   - [ ] auto deploy to test server on build success
9. Stretch goals
   - [ ] investigare [cucumber](https://cukes.info/) for Human readable testing
   - [ ] enforce testing style guide
   - [ ] incorporate e2e tests
