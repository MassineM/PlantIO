#include <WiFi.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
#include <Firebase.h>
#include <Firebase_ESP_Client.h>
#include "driver/adc.h"
#include "time.h"
// Provide the token generation process info.
#include "addons/TokenHelper.h"
// Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

#if defined(ESP32)
#include <WiFi.h>
#elif defined(ESP8266)
#include <ESP8266WiFi.h>
#endif

#define WIFI_SSID "delamotte"
#define WIFI_PASSWORD "gilou59190"
#define DATABASE_URL "https://plantio24-default-rtdb.europe-west1.firebasedatabase.app"
#define API_KEY "AIzaSyCEgObGXsWE22IHwxGRMPCGUsZ0eLCz9cg"

#define DHT_PIN 26
#define DHT_TYPE DHT11

// Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

unsigned long sendDataPrevMillis = 0;

bool signupOK = false;

DHT dht(DHT_PIN, DHT_TYPE);
// DHT dht(DHT_PIN, DHT_TYPE);
#define LIGHT_SENSOR_PIN 35

String documentPath = "";

FirebaseJson content;

int count = 0;

// struct tm timeinfo;
const char *ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 3600;
const int daylightOffset_sec = 3600;

void localTime()
{
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo))
  {
    Serial.println("Failed to obtain time");
    return;
  }
  Serial.println(&timeinfo, "%A, %B %d %Y %H:%M:%S");
}

String tempPath = "";
void setup()
{
  Serial.begin(115200);
  // dht.begin();
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; // see addons/TokenHelper.h
  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  if (Firebase.signUp(&config, &auth, "", ""))
  {
    Serial.println("ok");
    signupOK = true;
  }
  else
  {
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  localTime();
}

void loop()
{
  delay(6000);

  // int luminosity = adc1_get_raw((adc1_channel_t)LIGHT_SENSOR_PIN);
  int luminosity = analogRead(LIGHT_SENSOR_PIN);
  // int luminosity = 4095;
  // float temperature = 22;

  // float humidity = (temperature / 30) * 100;

  time_t now = time(nullptr);
  struct tm *timeinfo;
  timeinfo = localtime(&now);
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  if (isnan(temperature) || isnan(humidity))
  {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 15000 || sendDataPrevMillis == 0))
  {
    sendDataPrevMillis = millis();
    // Write an Int number on the database path test/int
    if (Firebase.RTDB.setFloat(&fbdo, "plantations/z4tNTBeIVKdRUKH3AOmo1iO8VxM2/-NO-r_gLxJDwqW5zkV2B/spots/-NO-rojyGMLDHSkA6Gab/realtimeHumd", humidity))
    {
      Serial.println("PASSED Humd");
    }
    else
    {
      Serial.println("FAILED Humd");
      Serial.println(fbdo.errorReason());
    }

    // Write an Float number on the database path test/float
    if (Firebase.RTDB.setFloat(&fbdo, "plantations/z4tNTBeIVKdRUKH3AOmo1iO8VxM2/-NO-r_gLxJDwqW5zkV2B/spots/-NO-rojyGMLDHSkA6Gab/realtimeTemp", temperature))
    {
      Serial.println("PASSED temp");
    }
    else
    {
      Serial.println("FAILED temp");
      Serial.println(fbdo.errorReason());
    }
  }
  if (Firebase.RTDB.setInt(&fbdo, "plantations/z4tNTBeIVKdRUKH3AOmo1iO8VxM2/-NO-r_gLxJDwqW5zkV2B/spots/-NO-rojyGMLDHSkA6Gab/realtimeLum", luminosity))
  {
    Serial.println("PASSED Lum");
  }
  else
  {
    Serial.println("FAILED LUm");
    Serial.println(fbdo.errorReason());
  }

  char buffer[20];
  strftime(buffer, 20, "%Y-%m-%d::%H:%M:%S", timeinfo);
  String str_timestamp(buffer);
  documentPath = "-NO-rojyGMLDHSkA6Gab/" + str_timestamp;

  content.set("fields/temperature/doubleValue", String(temperature).c_str());
  content.set("fields/humidity/doubleValue", String(humidity).c_str());
  content.set("fields/luminosity/doubleValue", String(luminosity).c_str());

  Serial.println(String(temperature));
  Serial.println(String(humidity));
  Serial.println(String(luminosity));
  Serial.println(documentPath);

  localTime();

  // if (Firebase.Firestore.patchDocument(&fbdo, 'plantio24', "", documentPath.c_str(), content.raw(), "temperature" + count + ",humidity" + count + ", luminosity" + count + ",date" + count))
  // {
  //   Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
  //   return;
  // }
  // else
  // {
  //   Serial.println(fbdo.errorReason());
  // }

  if (Firebase.Firestore.createDocument(&fbdo, "plantio24", "", documentPath.c_str(), content.raw()))
  {
    Serial.printf("ok\n%s\n\n", fbdo.payload().c_str());
    return;
  }
  else
  {
    Serial.println(fbdo.errorReason());
  }
}