#include <OneWire.h>
#include <DallasTemperature.h>
#include <SoftwareSerial.h>

// Data wire is plugged into pin A4 on the Arduino
#define ONE_WIRE_BUS A0
SoftwareSerial mySerial(4, 5); // RX, TX
#define SSID "SSID"
#define PASS "PASSWORD"
#define DST_IP "52.50.20.110" // dev.thebedlab.com
#define PATH "/~martin/brewmonitor/api/readings"
#define HOST "dev.thebedlab.com"
#define DEV_ID "2" //can be used in future developments for multiple installations
unsigned long transmissionFrequency = 30000;
unsigned long checkFrequency = 5000;
double Setpoint = 19.5;

// Setup a oneWire instance to communicate with any OneWire devices
// (not just Maxim/Dallas temperature ICs)
OneWire oneWire(ONE_WIRE_BUS);
// Pass our oneWire reference to Dallas Temperature.
DallasTemperature sensors(&oneWire);
unsigned long lastTransmission, lastCheck;
boolean webConnected;
int RelayPin = 12;
int RelayPower = 2;
boolean heatingOn = false;

void setup()
{
  pinMode(RelayPin, OUTPUT);
  pinMode(RelayPower, OUTPUT);
  digitalWrite(RelayPin, HIGH);
  digitalWrite(RelayPower, HIGH);
  webConnected = false;
  mySerial.begin(9600);
  pinMode(13, OUTPUT);
  digitalWrite(13, LOW);
  lastTransmission = millis();
  lastCheck = millis();
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }
  for (int i = 0; i < 10; i++)
  {
    if (!webConnected) {
      mySerial.println("AT");
      //delay(1000);
      if (mySerial.find("OK"))
      {
        webConnected = true;
        Serial.println("Module is addressable");
        break;
      }
    }
  }
  if (!webConnected)
  {
    // Turn LED on continuously to signify stall
    ledOn();
    Serial.println("Module not addressable. Try resetting or continue without Internet.");
  }
  else {
    delay(1000);
    //connect to the wifi
    webConnected = false;
    for (int i = 0; i < 10; i++)
    {
      if (connectWiFi())
      {
        // flash LED to let us know that device connected
        flash();
        Serial.println("Module is connected to WLAN");
        webConnected = true;
        break;
      }
    }
    if (!webConnected)
    {
      // Turn LED on continuously to signify stall
      ledOn();
      Serial.println("Could not connect to WLAN. Try resetting or continue without Internet.");
    }
    delay(5000);
    Serial.println("AT+CIPMUX=0");
  }
  sensors.begin();
}

void loop()
{
  if (millis() - lastCheck > checkFrequency) {
    lastCheck = lastCheck + checkFrequency;
    sensors.requestTemperatures();
    float temperature = sensors.getTempCByIndex(0);
    if (!heatingOn && temperature < (Setpoint - 0.2))
    {
      heatingOn = true;
      Serial.println("Turning Heating On.");
      digitalWrite(RelayPin, LOW);
    }
    else if (heatingOn && temperature > Setpoint)
    {
      heatingOn = false;
      Serial.println("Turning Heating Off.");
      digitalWrite(RelayPin, HIGH);
    }

    Serial.print("HeatingOn=");
    Serial.print(heatingOn);
    Serial.print("Temp=");
    Serial.println(temperature);
  }


  if (webConnected && (millis() - lastTransmission > transmissionFrequency))
  {
    lastTransmission += transmissionFrequency;
    String cmd = "AT+CIPSTART=\"TCP\",\"";
    cmd += DST_IP;
    cmd += "\",80";
    mySerial.println(cmd);
    if (mySerial.find("Error")) return;
    sensors.requestTemperatures();
    float tempf = sensors.getTempCByIndex(0);
    int temp1 = (int)tempf;
    int temp2 = (tempf - temp1) * 100;
    String temp = "";
    temp += temp1;
    temp += ".";
    if (temp2 < 10)
      temp += "0";
    temp += temp2;
    String payload = "device=";
    payload += DEV_ID;
    payload += "&temp=" + temp;
    payload += "&heaton=";
    payload += heatingOn;
    Serial.println(payload);
    cmd = "POST ";
    cmd += PATH;
    cmd += " HTTP/1.0\r\nHost: ";
    cmd += HOST;
    cmd += "\r\nCache-Control: no-cache\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: ";
    cmd += payload.length();
    cmd += "\r\n\r\n";
    cmd += payload;
    cmd += "\r\n";
    mySerial.print("AT+CIPSEND=");
    mySerial.println(cmd.length());
    if (mySerial.find(">"))
    {
    } else
    {
      mySerial.println("AT+CIPCLOSE");
      delay(1000);
      return;
    }
    mySerial.print(cmd);
    // flash LED to let us know that msg sent
    flash();
    Serial.println("Successful upload.");
    delay(1000);
    while (mySerial.available())
    {
      char c = mySerial.read();
    }
  }
}

boolean connectWiFi()
{
  mySerial.println("AT+CWMODE=1");
  delay(2000);
  String cmd = "AT+CWJAP=\"";
  cmd += SSID;
  cmd += "\",\"";
  cmd += PASS;
  cmd += "\"";
  mySerial.println(cmd);
  delay(5000);
  if (mySerial.find("OK"))
  {
    Serial.println("Connected to AP");
    return true;
  } else
  {
    Serial.println("Not connected to AP");
    return false;
  }
}

void ledOn() {
  digitalWrite(13, HIGH);
}

void flash()
{
  digitalWrite(13, HIGH);
  delay(1000);
  digitalWrite(13, LOW);
}
