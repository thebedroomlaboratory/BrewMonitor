# BrewMonitor

## The Arduino and Cloud-based homebrewing controller

Homepage: http://thebedroomlaboratory.com/brewmonitor-the-arduino-and-cloud-based-homebrewing-controller/

Demo sites:
* http://dev.thebedroomlaboratory.com/~martin/brewmonitor/ (PHP - Stable)
* http://dev.thebedroomlaboratory.com/brewmonitor/ (Node - Unstable)

### Arduino Library Requirements (latest versions):

* http://www.pjrc.com/teensy/td_libs_OneWire.html
* http://milesburton.com/Main_Page?title=Dallas_Temperature_Control_Library

### REST API Format

* GET
  * http://dev.thebedroomlaboratory.com/brewmonitor/api/v1.0
* POST
  * http://dev.thebedroomlaboratory.com/brewmonitor/api/v1.0
  * `{ "userid": 0, "devid": 0, "temps": [{"sensid": 0, "temp": 20.2}, {"sensid": 1, "temp": 20.8}], "timestamp": "2014-11-15T16:56:08.506Z" }`

### Installation

First thing to do is to clone this repository. All paths are given relative to the root of the repository.

#### MongoDB

Make sure Mongo is installed and running. A dump of the DB was created in `Backend` using:
```bash
cd Backend
mongodump -d brew
```
This can be loaded locally using:
```bash
cd Backend
mongorestore
```

#### Node-Red

Download and extract node-red zip file from http://nodered.org/ to `Backend/node-red`
```bash
cd Backend/node-red
npm install --production
npm install mongodb
rm settings.js
ln -s ../settings.js
```
If you have any complication or to install the Additional Nodes, check the instructions on http://nodered.org/docs/getting-started/installation.html

#### Apache2 and Node-Red at same time

Configure Apache with the following settings:

```bash
LoadModule proxy_module modules/mod_proxy.so
LoadModule proxy_http_module modules/mod_proxy_http.so
LoadModule proxy_wstunnel_module modules/mod_proxy_wstunnel.so

ProxyPreserveHost On
ProxyRequests Off
ProxyPass /brewmonitor/comms ws://127.0.0.1:8123/brewmonitor/comms
ProxyPass /brewmonitor http://127.0.0.1:8123/brewmonitor
ProxyPassReverse /brewmonitor http://127.0.0.1:8123/brewmonitor
```

You can do this using:
* `a2enmod` and `/etc/apache2/sites-enabled/000-default.conf` (Ubuntu)
* Or all in your `httpd.conf` file by adding the text as above (codio.com)
 
After that, check that your node-red app/server settings match up. This can be found in `Backend/settings.js`:
* `uiPort: 8123,`
* `httpRoot: '/brewmonitor',`

You may as well allow AJAX calls from other servers at this point too
```bash
 httpNodeCors: {
  origin: "*",
  methods: "GET,PUT,POST,DELETE"
 },
```

### Running Server
```bash
./startNodeRed.sh
```
This launches the Node-Red server which can then be found at http://domain/brewmonitor/. To run it as a daemon, do the following (sudo may be required for global npm install):
```bash
cd Backend/node-red
npm install forever -g
forever start red.js ../BrewMonitor.json
```
