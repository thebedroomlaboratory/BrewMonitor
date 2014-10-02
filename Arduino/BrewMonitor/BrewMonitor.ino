#include <OneWire.h>
#include <DallasTemperature.h>
#include <SoftwareSerial.h>
 
// Data wire is plugged into pin 2 on the Arduino
#define ONE_WIRE_BUS A4
#define SSID "SSID"
#define PASS "PASSWORD"
#define DST_IP "54.76.114.101" //baidu.com
#define PATH "/~martin/brewmonitor/api/readings"
#define HOST "dev.thebedroomlaboratory.com"
#define DEV_ID "1"
SoftwareSerial dbgSerial(10, 11); // RX, TX
 
// Setup a oneWire instance to communicate with any OneWire devices 
// (not just Maxim/Dallas temperature ICs)
OneWire oneWire(ONE_WIRE_BUS);
 
// Pass our oneWire reference to Dallas Temperature.
DallasTemperature sensors(&oneWire);

void setup()
{
  // Open serial communications and wait for port to open:
  Serial.begin(115200);
//  Serial.setTimeout(5000);
  dbgSerial.begin(9600); //can't be faster than 19200 for softserial
  dbgSerial.println("ESP8266 Demo");
  //test if the module is ready
  delay(5000);
  Serial.println("AT+RST");
  delay(1000);
  
  if(Serial.find("ready"))
  {
    digitalWrite(13,HIGH);
    delay(500);
    digitalWrite(13,LOW);
    dbgSerial.println("Module is ready");
  }
  else
  {
    dbgSerial.println("Module have no response.");
    while(1);
  }
  delay(1000);
  //connect to the wifi
  boolean connected=false;
  for(int i=0;i<5;i++)
  {
    if(connectWiFi())
    {
      digitalWrite(13,HIGH);
      delay(500);
      digitalWrite(13,LOW);
      connected = true;
      break;
    }
  }
  if (!connected)
  {
    dbgSerial.println("Uh oh");
    while(1);
  }
  delay(5000);
  //print the ip addr
  /*Serial.println("AT+CIFSR");
  dbgSerial.println("ip address:");
  while (Serial.available())
  dbgSerial.write(Serial.read());*/
  //set the single connection mode
  Serial.println("AT+CIPMUX=0");
  sensors.begin();
}

void loop()
{
  String cmd = "AT+CIPSTART=\"TCP\",\"";
  cmd += DST_IP;
  cmd += "\",80";
  Serial.println(cmd);
  dbgSerial.println(cmd);
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
    dbgSerial.print(">");
  }else
  {
    Serial.println("AT+CIPCLOSE");
    dbgSerial.println("connect timeout");
    delay(1000);
    return;
  }
  Serial.print(cmd);
  delay(2000);
  //Serial.find("+IPD");
  while (Serial.available())
  {
    char c = Serial.read();
    dbgSerial.write(c);
    if(c=='\r')
      dbgSerial.print('\n');
  }
  dbgSerial.println("====");
  delay(56000);
}

boolean connectWiFi()
{
  Serial.println("AT+CWMODE=1");
  String cmd="AT+CWJAP=\"";
  cmd+=SSID;
  cmd+="\",\"";
  cmd+=PASS;
  cmd+="\"";
  dbgSerial.println(cmd);
  Serial.println(cmd);
  delay(2000);
  if(Serial.find("OK"))
  {
    dbgSerial.println("OK, Connected to WiFi.");
    return true;
  }else
  {
    dbgSerial.println("Can not connect to the WiFi.");
    return false;
  }
}
