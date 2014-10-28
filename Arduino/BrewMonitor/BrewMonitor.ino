#include <OneWire.h>
#include <DallasTemperature.h>
 
// Data wire is plugged into pin A4 on the Arduino
#define ONE_WIRE_BUS A4
#define SSID "SSID"
#define PASS "PASSWORD"
#define DST_IP "54.76.114.101" // dev.thebedroomlaboratory.com
#define PATH "/~martin/brewmonitor/api/readings"
#define HOST "dev.thebedroomlaboratory.com"
#define DEV_ID "1" //can be used in future developments for multiple installations
 
// Setup a oneWire instance to communicate with any OneWire devices 
// (not just Maxim/Dallas temperature ICs)
OneWire oneWire(ONE_WIRE_BUS);
 
// Pass our oneWire reference to Dallas Temperature.
DallasTemperature sensors(&oneWire);

void setup()
{
  pinMode(13, OUTPUT);
  digitalWrite(13,LOW);
  // Open serial communications and wait for port to open:
  Serial.begin(115200);
  Serial.setTimeout(5000);
  //test if the module is ready
  delay(5000);
  Serial.println("AT+RST");
  delay(1000);
  
  if(Serial.find("ready"))
  {
    // flash LED to let us know that device ready
    flash();
  }
  else
  {
    // Turn LED on continuously to signify stall
    ledOn();
    while(1);
  }
  delay(1000);
  //connect to the wifi
  boolean connected=false;
  for(int i=0;i<5;i++)
  {
    if(connectWiFi())
    {
      // flash LED to let us know that device connected
      flash();
      connected = true;
      break;
    }
  }
  if (!connected)
  {
    // Turn LED on continuously to signify stall
    ledOn();
    while(1);
  }
  delay(5000);
  Serial.println("AT+CIPMUX=0");
  sensors.begin();
}

void loop()
{
  String cmd = "AT+CIPSTART=\"TCP\",\"";
  cmd += DST_IP;
  cmd += "\",80";
  Serial.println(cmd);
  if(Serial.find("Error")) return;
  sensors.requestTemperatures();
  float tempf = sensors.getTempCByIndex(0);
  int temp1 = (int)tempf;
  int temp2 = (tempf - temp1) * 100;
  String temp="";
  temp += temp1;
  temp += ".";
  if (temp2<10)
    temp += "0";
  temp += temp2;
  String payload = "device=";
  payload += DEV_ID;
  payload += "&temp="+temp;
  cmd = "POST ";
  cmd += PATH;
  cmd += " HTTP/1.0\r\nHost: ";
  cmd += HOST;
  cmd += "\r\nCache-Control: no-cache\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: ";
  cmd += payload.length();
  cmd += "\r\n\r\n";
  cmd += payload;
  cmd += "\r\n";
  Serial.print("AT+CIPSEND=");
  Serial.println(cmd.length());
  if(Serial.find(">"))
  {
  }else
  {
    Serial.println("AT+CIPCLOSE");
    delay(1000);
    return;
  }
  Serial.print(cmd);
  // flash LED to let us know that msg sent
  flash();
  delay(1000);
  while (Serial.available())
  {
    char c = Serial.read();
  }
  delay(600000);
  delay(600000);
  delay(591530);  
}

boolean connectWiFi()
{
  Serial.println("AT+CWMODE=1");
  String cmd="AT+CWJAP=\"";
  cmd+=SSID;
  cmd+="\",\"";
  cmd+=PASS;
  cmd+="\"";
  Serial.println(cmd);
  delay(2000);
  if(Serial.find("OK"))
  {
    return true;
  }else
  {
    return false;
  }
}

void ledOn(){
  digitalWrite(13,HIGH);
}

void flash()
{
  digitalWrite(13,HIGH);
  delay(1000);
  digitalWrite(13,LOW);
}
