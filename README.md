# BrewMonitor

## The Arduino and Cloud-based homebrewing controller

Homepage: http://thebedroomlaboratory.com/brewmonitor-the-arduino-and-cloud-based-homebrewing-controller/

Demo site: http://dev.thebedroomlaboratory.com/~martin/brewmonitor/

### Arduino Library Requirements (latest versions):

* http://www.pjrc.com/teensy/td_libs_OneWire.html
* http://milesburton.com/Main_Page?title=Dallas_Temperature_Control_Library

### REST API Format

* GET
  * http://opus-sahara.codio.io:1880/api/brew/v1.0
* POST
  * http://opus-sahara.codio.io:1880/api/brew/v1.0
  * `{ "devid": 0, "temps": [{"sensid": 0, "temp": 22.2}, {"sensid": 1, "temp": 21.8}], "timestamp": "2014-11-13T03:02:08.506Z" }`
