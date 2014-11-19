[
  {
    "type":"tab",
    "id":"f0af3643.604ff",
    "label":"Sheet 1",
    "name":"v1.0"
  },
  {
    "id":"ad91e949.1b5c6",
    "type":"mongodb",
    "hostname":"127.0.0.1",
    "port":"27017",
    "db":"brew",
    "name":"BrewDB"
  },
  {
    "id":"24bc4078.764c6",
    "type":"http in",
    "name":"Read",
    "url":"/api/brew/v1.0",
    "method":"get",
    "x":66,
    "y":121,
    "z":"f0af3643.604ff",
    "wires":[
      [
        "6feb91f8.a25a88"
      ]
    ]
  },
  {
    "id":"58b4a0f6.7db4d",
    "type":"http response",
    "name":"Response",
    "x":380,
    "y":121,
    "z":"f0af3643.604ff",
    "wires":[

    ]
  },
  {
    "id":"6c958f91.dca47",
    "type":"debug",
    "name":"Log",
    "active":true,
    "console":"true",
    "complete":"payload",
    "x":369,
    "y":161,
    "z":"f0af3643.604ff",
    "wires":[

    ]
  },
  {
    "id":"f6a5afc9.82e07",
    "type":"http in",
    "name":"Write",
    "url":"/api/brew/v1.0",
    "method":"post",
    "x":65,
    "y":303,
    "z":"f0af3643.604ff",
    "wires":[
      [
        "2f950b5e.fdc184",
        "95a96b26.b31bf"
      ]
    ]
  },
  {
    "id":"a6a6c911.a761a8",
    "type":"http response",
    "name":"Response",
    "x":369,
    "y":303,
    "z":"f0af3643.604ff",
    "wires":[

    ]
  },
  {
    "id":"e19a6241.9209d",
    "type":"debug",
    "name":"LogPost",
    "active":true,
    "console":"true",
    "complete":"true",
    "x":359,
    "y":387,
    "z":"f0af3643.604ff",
    "wires":[

    ]
  },
  {
    "id":"d139a03c.b6d638",
    "type":"comment",
    "name":"API GET Handler",
    "info":"",
    "x":94,
    "y":84,
    "z":"f0af3643.604ff",
    "wires":[

    ]
  },
  {
    "id":"4061c04c.fcd59",
    "type":"comment",
    "name":"API POST Handler",
    "info":"",
    "x":98,
    "y":265,
    "z":"f0af3643.604ff",
    "wires":[

    ]
  },
  {
    "id":"804a0864.bf1c3",
    "type":"mongodb out",
    "mongodb":"ad91e949.1b5c6",
    "name":"brew-write",
    "collection":"tempData",
    "payonly":false,
    "upsert":false,
    "multi":false,
    "operation":"insert",
    "x":366,
    "y":346,
    "z":"f0af3643.604ff",
    "wires":[

    ]
  },
  {
    "id":"95a96b26.b31bf",
    "type":"function",
    "name":"Stamp",
    "func":"var temps = JSON.parse(msg.req.body);\ntemps.timestamp = new Date(temps.timestamp);\nreturn temps;",
    "outputs":1,
    "x":194,
    "y":346,
    "z":"f0af3643.604ff",
    "wires":[
      [
        "e19a6241.9209d",
        "804a0864.bf1c3"
      ]
    ]
  },
  {
    "id":"2f950b5e.fdc184",
    "type":"function",
    "name":"ResData",
    "func":"var newDate = new Date();\nnewDate.setMinutes(newDate.getMinutes() + 30);\nmsg.payload = newDate;\nreturn msg;",
    "outputs":1,
    "x":201,
    "y":303,
    "z":"f0af3643.604ff",
    "wires":[
      [
        "a6a6c911.a761a8"
      ]
    ]
  },
  {
    "id":"6feb91f8.a25a88",
    "type":"mongodb in",
    "mongodb":"ad91e949.1b5c6",
    "name":"brewTempRead",
    "collection":"tempData",
    "operation":"find",
    "x":213,
    "y":121,
    "z":"f0af3643.604ff",
    "wires":[
      [
        "6c958f91.dca47",
        "58b4a0f6.7db4d"
      ]
    ]
  }
]
