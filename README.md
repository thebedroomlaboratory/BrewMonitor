# BrewMonitor - Node-Angular Port (work in progress)

## The Arduino and Cloud-based homebrewing controller

Homepage: http://thebedroomlaboratory.com/brewmonitor-the-arduino-and-cloud-based-homebrewing-controller/

###How to Use:
Make sure mongodb is running then run:
 * `npm install`
 * `bower install`
 * `node index.js`
 * Open:
    - [localhost:9000](http://localhost:9000) for the main UI
    - [localhost:9000/red](http://localhost:9000/red) for Node-Red UI

###To Do:
 - [x] Create Basic `Express.js` Server to server Angular App
 - [x] Incorporate `Node-Red` TO Server on from same Express server
 - [ ] Port Laravel routes `~martin/brewmonitor/api/readings` to Express.js routes
 - [ ] Update content of main page with Real Content
 - [ ] Include Test Runner
 - [ ] include gulp Tasks to:
 	 - [ ] Run Server
 	 - [ ] Run Tests
 	 - [ ] Build and minify Client
 	 - [ ] Incorporate Browserify ?? (to allow publising to npm)
