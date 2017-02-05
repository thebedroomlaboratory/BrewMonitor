# BrewMonitor

## The Arduino and Cloud-based homebrewing controller

Homepage: http://thebedlab.com/brewmonitor-the-arduino-and-cloud-based-homebrewing-controller/

Demo sites:

* http://dev.thebedlab.com/~martin/brewmonitor/ (PHP - Stable)
* http://dev.thebedlab.com/brewmonitor/ (Node - Unstable)

### Arduino Library Requirements (latest versions):

* http://www.pjrc.com/teensy/td_libs_OneWire.html
* http://milesburton.com/Main_Page?title=Dallas_Temperature_Control_Library

### REST API Format

* PHP Backend
  * http://dev.thebedlab.com/~martin/brewmonitor/api/help (to be added but this is a placeholder)
  * http://dev.thebedlab.com/~martin/brewmonitor/api/readings (GET)
  * http://dev.thebedlab.com/~martin/brewmonitor/api/readings (POST)
    * as URL parameters
    * `http://dev.thebedlab.com/~martin/brewmonitor/api/readings/?device=1&temp=20.0&heaton=1.0`
* Node.js Backend
  * http://dev.thebedlab.com/brewmonitor/api/v1.0/help
  * http://dev.thebedlab.com/brewmonitor/api/v1.0/list (GET)
    * URL parameters optional, e.g.
    * http://dev.thebedlab.com/brewmonitor/api/v1.0/list?devid=1&userid=1
  * http://dev.thebedlab.com/brewmonitor/api/v1.0 (POST)
    * `{ "userid": 0, "devid": 0, "temps": [{"sensid": 0, "temp": 20.2}, {"sensid": 1, "temp": 20.8}], "timestamp": "2014-11-15T16:56:08.506Z" }`

### Installation

First thing to do is to clone this repository. All paths are given relative to the root of the repository. From here on it is also assumed that the root of the repository will show up at http://domain/

#### Stable Version (PHP/MySQL Backend with Angular on frontend)

* Install apache2 mysql php5 php5-mcrypt php5-apache2 php5-zip php5-mysql php5-pdo-mysql phpmyadmin composer
* `composer self-update`
* `composer global require "laravel/installer=~1.1"`
* add ~/.composer/vendor/bin to $PATH in .bash_profile
* `cd Backend`
* `wget https://github.com/laravel/laravel/archive/master.zip`
* `rm -r laravel`
* `unzip master.zip`
* `mv laravel-master laravel`
* `cd laravel`
* `git checkout .`
* `composer install`
* `cd ../../Frontend/brewmonitor/js`
* `mkdir graphing`
* `cd graphing`
* `wget http://dev.thebedlab.com/~martin/brewmonitor/js/graphing/angular-moment.min.js; wget http://dev.thebedlab.com/~martin/brewmonitor/js/graphing/angular-moment.min.js.map; wget http://dev.thebedlab.com/~martin/brewmonitor/js/graphing/line-chart.min.js; wget http://dev.thebedlab.com/~martin/brewmonitor/js/graphing/moment.min.js`
* Configure your username/password settings in `Backend/laravel/app/config/database.php`
* Create database table and seed it with some sample data
  * Use phpmyadmin to create table called `brewmonitor`
  * `cd Backend/laravel`
  * `php artisan migrate`
  * `php artisan db:seed`
* That's it! You should now be able to see a graph in your browser at http://domain/Frontend/brewmonitor/ once apache2 and mysql are running

#### Development Version (Node.js/MongoDB Backend)

##### MongoDB

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

##### Node-Red

Download and extract node-red zip file from http://nodered.org/ to `Backend/node-red`
```bash
cd Backend/node-red
npm install --production
npm install mongodb
rm settings.js
ln -s ../settings.js
```
If you have any complications or want to install Additional Nodes, check the instructions on http://nodered.org/docs/getting-started/installation.html

##### Apache2 and Node-Red at same time

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
* Either way, remember to restart Apache afterwards so that the settings can take effect
 
After that, check that your node-red app/server settings match up. This can be found in `Backend/settings.js`:

* `uiPort: 8123,`
* `httpRoot: '/brewmonitor',`

You may as well allow AJAX calls from other servers at this point too, if required (Ionic app for instance...)
```bash
 httpNodeCors: {
  origin: "*",
  methods: "GET,PUT,POST,DELETE"
 },
```

##### Running Server
Make sure MongoDB and Apache are running, then run the following command:
```bash
./startNodeRed.sh
```
This launches the Node-Red server which can then be found at http://domain/brewmonitor/. To run it as a daemon, do the following (sudo may be required for global npm install):
```bash
cd Backend/node-red
npm install forever -g
forever start red.js ../BrewMonitor.json
```
