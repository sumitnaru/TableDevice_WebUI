#include <ESP8266WiFi.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>

const IPAddress apIP(192, 168, 1, 1);
const char* apSSID = "ESP_Master_Network";
const char* apPASS = "12345678";
DNSServer dnsServer;
ESP8266WebServer webServer(80);

void setup() {
  WiFi.disconnect();
  Serial.begin(9600);
  setupMode();
}

void loop() {
  dnsServer.processNextRequest();
  webServer.handleClient();
}

void setupMode() {
  WiFi.mode(WIFI_AP);
  WiFi.softAPConfig(apIP, apIP, IPAddress(255, 255, 255, 0));
  WiFi.softAP(apSSID, apPASS);
  //WiFi.softAP(apSSID);
  dnsServer.start(53, "*", apIP);
  StartServer();
  Serial.print("Starting Access Point at \"");
  Serial.print(apSSID);
  Serial.println("\"");
}

void StartServer() {
  Serial.print("Starting Web Server at ");
  Serial.println(WiFi.softAPIP());
  webServer.on("/", []() {
    String did = urlDecode(webServer.arg("did"));
    String statusV = urlDecode(webServer.arg("status"));
    /*if(did == NULL)
      Serial.println("NULL");
    if(did == "");
      Serial.println("Empty");*/
    String s = "{";
    s += did;
    s += ",";
    s += statusV;
    s += "}";
    Serial.println(s);

    webServer.send(200, "text/html", "Return_Data: "+ s);
  });
  webServer.begin();
}

String urlDecode(String input) {
  String s = input;
  s.replace("%20", " ");
  s.replace("+", " ");
  s.replace("%21", "!");
  s.replace("%22", "\"");
  s.replace("%23", "#");
  s.replace("%24", "$");
  s.replace("%25", "%");
  s.replace("%26", "&");
  s.replace("%27", "\'");
  s.replace("%28", "(");
  s.replace("%29", ")");
  s.replace("%30", "*");
  s.replace("%31", "+");
  s.replace("%2C", ",");
  s.replace("%2E", ".");
  s.replace("%2F", "/");
  s.replace("%2C", ",");
  s.replace("%3A", ":");
  s.replace("%3A", ";");
  s.replace("%3C", "<");
  s.replace("%3D", "=");
  s.replace("%3E", ">");
  s.replace("%3F", "?");
  s.replace("%40", "@");
  s.replace("%5B", "[");
  s.replace("%5C", "\\");
  s.replace("%5D", "]");
  s.replace("%5E", "^");
  s.replace("%5F", "-");
  s.replace("%60", "`");
  return s;
}
