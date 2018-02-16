#include <ESP8266WiFi.h>
//#include <WiFiClient.h>
#include <ESP8266HTTPClient.h>
#include <Adafruit_NeoPixel.h>

int  Table_No = 1;
int Delay = 2;
int deviceStatus = 0; //0=Idle; 1=Just Pressed;2=Urgent
int batState = 0;
String SSID_default = "ESP_Master_Network";
String Pass_default = "12345678";
//String SSID_default = "Wifi_Networkk";
//String Pass_default = "automatic";
String serverIP = "192.168.1.1";

String DeviceID = String(ESP.getChipId());

#define NUMPIXELS      8
int BtnA = 14; //D5
int BtnB = 12; //D6
int BtnC = 13; //D7
int btnS1, btnS2, btnS3;
int PixPin = 5;  //D1
int buzz = 4; //D2
int AnalogPin = A0;

int counter = 0;
unsigned long mainTimer = 0;
Adafruit_NeoPixel pixels = Adafruit_NeoPixel(NUMPIXELS, PixPin, NEO_GRB + NEO_KHZ800);

void setup() {
  WiFi.disconnect();
  WiFi.softAPdisconnect(true);
  WiFi.disconnect();
  Serial.begin(9600);
  pinMode(AnalogPin, INPUT);

  pinMode(BtnA, INPUT_PULLUP);
  pinMode(BtnB, INPUT_PULLUP);
  pinMode(BtnC, INPUT_PULLUP);
  pinMode(buzz, OUTPUT);
  //delay(10);
  digitalWrite(buzz, LOW);
  pixels.begin();
  int sensorValue, newsensorValue;
  newsensorValue = map(analogRead(AnalogPin), 0, 1023, 1, 6);
  do {
    sensorValue = newsensorValue;
    for (int i = 0; i < sensorValue; i++)
      pixels.setPixelColor(i, pixels.Color(255, 0, 0));
    for (int i = sensorValue; i < NUMPIXELS; i++)
      pixels.setPixelColor(i, pixels.Color(125, 100, 0));
    pixels.show();
    delay(3000);
    newsensorValue = map(analogRead(AnalogPin), 0, 1023, 1, 6);
  } while (sensorValue != newsensorValue);

  Delay = (sensorValue + 1) * 2;
  //setColor(255, 0, 0); // Red
  if (checkConnection()) {
    //settingMode = false;
    setColor(0, 125, 125);
    delay(1000);
    setColor(0, 255, 0); // Green
    delay(1000);
    setColor(0, 0, 0);

    getRequest();
    mainTimer = millis();
  }
}

void loop() {
  btnS1 = digitalRead(BtnA);
  btnS2 = digitalRead(BtnB);
  btnS3 = digitalRead(BtnC);
  if (!btnS1 || !btnS2 || !btnS3) {
    /*Serial.print(btnS1);
      Serial.print("; ");
      Serial.print(btnS2);
      Serial.print("; ");
      Serial.print(btnS3);
      Serial.println("; ");*/
    if (deviceStatus == 0 && btnS1 == 0) {
      deviceStatus = 3;
      counter = 0;
      mainTimer = millis();
      setColor(0, 0, 255);
      //Serial.println("Web Request Semi-Urgent!!");
      getRequest();
    }
    else if (btnS2 == 0) {
      deviceStatus = 4;
      mainTimer = 0;
      counter = Delay;
      setColor(255, 0, 0);
      mainTimer = millis();
      digitalWrite(buzz, HIGH);
      //Serial.println("Web Request Urgent!!");
      getRequest();
    }
    else if (btnS3 == 0 && deviceStatus != 0) {
      deviceStatus = 0;
      counter = 0;
      mainTimer = millis();
      setColor(0, 0, 0);
      digitalWrite(buzz, LOW);
      //Serial.println("Web Request Status 0!!");
      getRequest();
      //Reset mode
    }
    delay(1000);
  }

  if ((millis() - mainTimer) >= (60 * 1000)) { // should be 60 sec
    if (deviceStatus != 0) {    ///
      counter++;
      if (counter < Delay) {
        if (counter == Delay / 2)
          setColor(255, 100, 0);
        else if (counter == Delay - 2)
          setColor(255, 50, 0);
        else if (counter == Delay - 1)
          setColor(255, 25, 0);
      }
      else {
        if (counter == Delay) {
          deviceStatus = 4;
          setColor(255, 0, 0); // Red
          digitalWrite(buzz, HIGH);
        }
      }
    }
    getRequest();
    mainTimer = millis();
  }
}

void setColor(int redValue, int greenValue, int blueValue) {
  for (int i = 0; i < NUMPIXELS; i++)
    pixels.setPixelColor(i, pixels.Color(redValue, greenValue, blueValue));
  pixels.show();
}

boolean checkConnection() {
  int count = 0;
  WiFi.begin(SSID_default.c_str(), Pass_default.c_str());
  Serial.print("Waiting for Wi-Fi connection");
  while ( count < 30 ) {
    if (WiFi.status() == WL_CONNECTED) {
      Serial.println();
      Serial.println("Connected!");
      return (true);
    }
    delay(500);
    Serial.print(".");
    count++;
  }
  Serial.println("Timed out.");
  setColor(255, 0, 0); // RED
  return false;
}

void getRequest() {

  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status

    HTTPClient http;  //Declare an object of class HTTPClient
    //Serial.println("Performing GET..");
    String reqURL = "http://";
    reqURL += serverIP;
    reqURL += "/?did=";
    reqURL += DeviceID;
    reqURL += "&status=";
    reqURL += String(deviceStatus);
    Serial.println(reqURL);
    http.begin(reqURL); //Specify request destination
    int httpCode = http.GET();                                                                  //Send the request

    if (httpCode > 0) { //Check the returning code

      //String payload = http.getString();   //Get the request response payload
      //Serial.println(payload);                     //Print the response payload

      /*for (int i = 0; i < payload.length(); i++) {
        if (payload.substring(i, i + 1) == ",") {
          firstVal = payload.substring(7, i - 1);
          secondVal = payload.substring(i + 8, (payload.length() - 3));
          break;
        }
        }*/
    }
    else
    {
      Serial.println("WebServer Down!!");
    }
    http.end();   //Close connection
  }
  if(deviceStatus == 3)
    deviceStatus = 1;
  else if(deviceStatus == 4)
    deviceStatus = 2;
}
