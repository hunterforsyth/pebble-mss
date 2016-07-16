
// =================================================================
// TRANSIT CONFIG:
// Get STOP_ID's from nextbus.com

var TRANSIT_PROVIDER = "ttc";
var TRANSIT_STOP_ID_1 = "14538"; var TRANSIT_1_EXTRA_PARAMS = "&routeTag=63"; var TRANSIT_1_NAME = "63N";
var TRANSIT_STOP_ID_2 = "13625"; var TRANSIT_2_EXTRA_PARAMS = "&routeTag=63"; var TRANSIT_2_NAME = "63S";
var TRANSIT_STOP_ID_3 = "4155"; var TRANSIT_3_EXTRA_PARAMS = "&routeTag=504"; var TRANSIT_3_NAME = "504";
var TRANSIT_STOP_ID_4 = "4155"; var TRANSIT_4_EXTRA_PARAMS = "&routeTag=514"; var TRANSIT_4_NAME = "514";

var TRANSIT_SECONDS_REGEX_MATCH = /seconds=\"(.*?)\"/;
var TRANSIT_URL = "http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=" + TRANSIT_PROVIDER + "&stopId=";
// =================================================================

var CLOUDPEBBLE = 1;

var CLIMACON = {
  'cloud'            : '!',
  'cloud_day'        : '"',
  'cloud_night'      : '#',
  'rain'             : '$',
  'rain_day'         : '%',
  'rain_night'       : '&',
  'showers'          : "'",
  'showers_day'      : '(',
  'showers_night'    : ')',
  'downpour'         : '*',
  'downpour_day'     : '+',
  'downpour_night'   : ',',
  'drizzle'          : '-',
  'drizzle_day'      : '.',
  'drizzle_night'    : '/',
  'sleet'            : '0',
  'sleet_day'        : '1',
  'sleet_night'      : '2',
  'hail'             : '3',
  'hail_day'         : '4',
  'hail_night'       : '5',
  'flurries'         : '6',
  'flurries_day'     : '7',
  'flurries_night'   : '8',
  'snow'             : '9',
  'snow_day'         : ':',
  'snow_night'       : ';',
  'fog'              : '<',
  'fog_day'          : '=',
  'fog_night'        : '>',
  'haze'             : '?',
  'haze_day'         : '@',
  'haze_night'       : 'A',
  'wind'             : 'B',
  'wind_cloud'       : 'C',
  'wind_cloud_day'   : 'D',
  'wind_cloud_night' : 'E',
  'lightning'        : 'F',
  'lightning_day'    : 'G',
  'lightning_night'  : 'H',
// ---
  'sun'              : 'I',
   'set'             : 'J',
   'rise'            : 'K',
   'low'             : 'L',
   'lower'           : 'M',
  'moon'             : 'N',
   'new'             : 'O',
   'wax_cresc'       : 'P',
   'wax_quart'       : 'Q',
   'wax_gib'         : 'R',
   'full'            : 'S',
   'wane_cresc'      : 'T',
   'wane_quart'      : 'U',
   'wane_gib'        : 'V',
  'snowflake'        : 'W',
  'tornado'          : 'X',
  'thermometer'      : 'Y',
   'temp_low'        : 'Z',
   'temp_med-low'    : '[',
   'temp_med-high'   : "\\",
   'temp_high'       : ']',
   'temp_full'       : '^',
  'celsius'          : '`',
  'fahrenheit'       : '_',
  'compass'          : 'a',
   'north'           : 'b',
   'east'            : 'c',
   'south'           : 'd',
   'west'            : 'e',
  'umbrella'         : 'f',
  'sunglasses'       : 'g',
  'cloud_refresh'    : 'h',
  'cloud_up'         : 'i',
  'cloud_down'       : 'j'
};

var OWMclimacon= {
// Thunderstorm
  200 : CLIMACON['lightning'], // thunderstorm with light rain
  201 : CLIMACON['lightning'], // thunderstorm with rain
  202 : CLIMACON['lightning'], // thunderstorm with heavy rain
  210 : CLIMACON['lightning'], // light thunderstorm
  211 : CLIMACON['lightning'], // thunderstorm
  212 : CLIMACON['lightning'], // heavy thunderstorm
  221 : CLIMACON['lightning'], // ragged thunderstorm
  230 : CLIMACON['lightning'], // thunderstorm with light drizzle
  231 : CLIMACON['lightning'], // thunderstorm with drizzle
  232 : CLIMACON['lightning'], // thunderstorm with heavy drizzle
// Drizzle
  300 : CLIMACON['drizzle'], // light intensity drizzle
  301 : CLIMACON['drizzle'], // drizzle
  302 : CLIMACON['drizzle'], // heavy intensity drizzle
  310 : CLIMACON['drizzle'], // light intensity drizzle rain
  311 : CLIMACON['drizzle'], // drizzle rain
  312 : CLIMACON['drizzle'], // heavy intensity drizzle rain
  313 : CLIMACON['showers'], // shower rain and drizzle
  314 : CLIMACON['showers'], // heavy shower rain and drizzle
  321 : CLIMACON['showers'], // shower drizzle
// Rain
  500 : CLIMACON['rain'], // light rain
  501 : CLIMACON['rain'], // moderate rain
  502 : CLIMACON['downpour'], // heavy intensity rain
  503 : CLIMACON['downpour'], // very heavy rain
  504 : CLIMACON['downpour'], // extreme rain
  511 : CLIMACON['downpour'], // freezing rain
  520 : CLIMACON['showers'], // light intensity shower rain
  521 : CLIMACON['showers'], // shower rain
  522 : CLIMACON['showers'], // heavy intensity shower rain
  531 : CLIMACON['showers'], // ragged shower rain
// Snow
  600 : CLIMACON['snow'], // light snow
  601 : CLIMACON['snow'], // snow
  602 : CLIMACON['snow'], // heavy snow
  611 : CLIMACON['sleet'], // sleet
  612 : CLIMACON['sleet'], // shower sleet
  615 : CLIMACON['snow'], // light rain and snow
  616 : CLIMACON['snow'], // rain and snow
  620 : CLIMACON['snow'], // light shower snow
  621 : CLIMACON['snow'], // shower snow
  622 : CLIMACON['snow'], // heavy shower snow
// Atmosphere
  701 : CLIMACON['haze'], // mist
  711 : CLIMACON['haze'], // smoke
  721 : CLIMACON['haze'], // haze
  731 : CLIMACON['haze'], // Sand/Dust Whirls
  741 : CLIMACON['fog'], // Fog
  751 : CLIMACON['haze'], // sand
  761 : CLIMACON['haze'], // dust
  762 : CLIMACON['haze'], // VOLCANIC ASH
  771 : CLIMACON['wind'], // SQUALLS
  781 : CLIMACON['tornado'], // TORNADO
// Clouds
  800 : CLIMACON['sun'], // sky is clear
  801 : CLIMACON['cloud_day'], // few clouds
  802 : CLIMACON['cloud_day'], // scattered clouds
  803 : CLIMACON['cloud_day'], // broken clouds
  804 : CLIMACON['cloud'], // overcast clouds
// Extreme
  900 : CLIMACON['tornado'], // tornado
  901 : CLIMACON['tornado'], // tropical storm
  902 : CLIMACON['tornado'], // hurricane
  903 : CLIMACON['temp_low'], // cold
  904 : CLIMACON['temp_high'], // hot
  905 : CLIMACON['wind'], // windy
  906 : CLIMACON['hail'], // hail
// Additional
  950 : CLIMACON['set'], // Setting
  951 : CLIMACON['sun'], // Calm
  952 : CLIMACON['sun'], // Light breeze
  953 : CLIMACON['sun'], // Gentle Breeze
  954 : CLIMACON['sun'], // Moderate breeze
  955 : CLIMACON['sun'], // Fresh Breeze
  956 : CLIMACON['wind'], // Strong breeze
  957 : CLIMACON['wind'], // High wind, near gale
  958 : CLIMACON['wind'], // Gale
  959 : CLIMACON['wind'], // Severe Gale
  960 : CLIMACON['lightning'], // Storm
  961 : CLIMACON['lightning'], // Violent Storm
  962 : CLIMACON['tornado'], // Hurricane
};

var OWM_DEFAULT_API_KEY = "1b5b37a3117bb6acd583d662fdbb24c7";

var configuration = {
  invert: 0,
  colored_temp: 1,
  light: 1,
  display_sec: 1,
  date_format: "%a, %d.%m.%Y",
  date_format_index: 2,
  time_zone_info: 2,

  vibe_disconnect: 1,
  vibe_full: 0,
  vibe_hour: 0,

  default_loc: "Berlin",
  autodetect_loc: 1,
  lang_id: "en",
  show_update_time: 0,
  moon_phase: 0,
  weatherLine1: 5,
  weatherLine2: 2,
  weatherLine3: 3,
  weatherLine4: 4,
  weatherUpdateInt: 1,

  degree_f: 0,
  speed_unit: 0,
  pressure_unit: 0,

  OWM_API_KEY: OWM_DEFAULT_API_KEY
};

var last_detected_loc = {
  lat: 0.0,
  lon: 0.0
}

var ForecastDataJSON;
var WeatherDataJSON;

var xhrRequest = function (url, type, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    callback(this.responseText);
  };
  xhr.open(type, url);
  xhr.send();
};

function locationSuccess(pos) {
  //TODO: save loc:
  window.localStorage.last_location = JSON.stringify(last_detected_loc);
  SendToPebble(pos, 0);
}

function locationError(err) {
  //TODO: load loc:

  if (window.localStorage.getItem("last_location")){
    last_location = JSON.parse(window.localStorage.configuration);
    //var test = JSON.parse(window.localStorage.configuration);
    last_detected_loc.lat = last_location.lat;
    last_detected_loc.lon = last_location.lon;
  } else {
  }

  if ((last_detected_loc.lat === 0.0) && (last_detected_loc.lon === 0.0)){
    var pos = {
      coords: {latitude: 0, longitude: 0}
    };
    SendToPebble(pos, 1);
  } else {
    var pos = {
      coords: {latitude: last_detected_loc.lat, longitude: last_detected_loc.lon}
    };
    SendToPebble(pos, 0);
  }
}

function SendToPebble(pos, use_default) {
  var url;
  var url_forecast;

  var multiplier = 10000;
  var pos_lat = Math.round(multiplier*pos.coords.latitude)/multiplier;
  var pos_lon = Math.round(multiplier*pos.coords.longitude)/multiplier;

  // Construct URL
  //configuration.OWM_API_KEY = OWM_DEFAULT_API_KEY; //TODO
  if (typeof configuration.OWM_API_KEY === 'string' || configuration.OWM_API_KEY instanceof String){
    if (configuration.OWM_API_KEY == "default"){
      configuration.OWM_API_KEY = OWM_DEFAULT_API_KEY;
    }
    if (String(configuration.OWM_API_KEY).length < 20){
      configuration.OWM_API_KEY = OWM_DEFAULT_API_KEY;
    }
  } else {
    configuration.OWM_API_KEY = OWM_DEFAULT_API_KEY;
  }
  if ((use_default === 0) && (configuration.autodetect_loc)){
    url = "http://api.openweathermap.org/data/2.5/weather?APPID=" + configuration.OWM_API_KEY + "&lat=" +
        pos_lat + "&lon=" + pos_lon + "&lang=" + configuration.lang_id;
    url_forecast = "http://api.openweathermap.org/data/2.5/forecast?APPID=" + configuration.OWM_API_KEY + "&lat=" +
        pos_lat + "&lon=" + pos_lon + "&lang=" + configuration.lang_id;
  } else {
    var city_name_req = configuration.default_loc;
    // Construct URL
    url = "http://api.openweathermap.org/data/2.5/weather?APPID=" + configuration.OWM_API_KEY + "&q=" + city_name_req + "&lang=" + configuration.lang_id;
    url_forecast = "http://api.openweathermap.org/data/2.5/forecast?APPID=" + configuration.OWM_API_KEY + "&q=" + city_name_req + "&lang=" + configuration.lang_id;
  }

  var url_bus_1 = TRANSIT_URL + TRANSIT_STOP_ID_1 + TRANSIT_1_EXTRA_PARAMS;
  var url_bus_2 = TRANSIT_URL + TRANSIT_STOP_ID_2 + TRANSIT_2_EXTRA_PARAMS;
  var url_bus_3 = TRANSIT_URL + TRANSIT_STOP_ID_3 + TRANSIT_3_EXTRA_PARAMS;
  var url_bus_4 = TRANSIT_URL + TRANSIT_STOP_ID_4 + TRANSIT_4_EXTRA_PARAMS;

  var utc_offset = new Date().getTimezoneOffset() * 60;

  // Get the forecast
  xhrRequest(url_forecast, 'GET',
    function(responseText) {
      var ForecastDataJSON_error = 0;
      try {
        ForecastDataJSON = JSON.parse(responseText);
      } catch (e){
        ForecastDataJSON_error = 1;
      }

      // Get the weather
      xhrRequest(url, 'GET',
        function(responseText) {
          var WeatherDataJSON_error = 0;
          var WeatherDataJSON_error_str = "";
          try {
            WeatherDataJSON = JSON.parse(responseText);
          } catch (e){
            WeatherDataJSON_error = 1;
            WeatherDataJSON_error_str = responseText;
          }

          // Get bus times
          xhrRequest(url_bus_1, 'GET',
            function(responseText) {
              var busTimes1;
              try {
                busTimes1 = responseText.match(TRANSIT_SECONDS_REGEX_MATCH);
              } catch (e) {}

              xhrRequest(url_bus_2, 'GET',
                function(responseText) {
                  var busTimes2;
                  try {
                    busTimes2 = responseText.match(TRANSIT_SECONDS_REGEX_MATCH);
                  } catch (e) {}

                  xhrRequest(url_bus_3, 'GET',
                    function(responseText) {
                      var busTimes3;
                      try {
                        busTimes3 = responseText.match(TRANSIT_SECONDS_REGEX_MATCH);
                      } catch (e) {}

                      xhrRequest(url_bus_4, 'GET',
                        function(responseText) {
                          var busTimes4;
                          try {
                            busTimes4 = responseText.match(TRANSIT_SECONDS_REGEX_MATCH);
                          } catch (e) {}

                          //---------------------------------------------------------------------------------------------------

                          if (!WeatherDataJSON_error){

                            // Temperature in Kelvin requires adjustment
                            var temperature = Math.round((WeatherDataJSON.main.temp - 273.15));
                            var temp_min = Math.round((WeatherDataJSON.main.temp_min - 273.15));
                            var temp_max = Math.round((WeatherDataJSON.main.temp_max - 273.15));


                            // Conditions
                            var conditions = WeatherDataJSON.weather[0].description;

                            var conditions_icon = OWMclimacon[WeatherDataJSON.weather[0].id].charCodeAt(0);


                            var pressure = Math.round(WeatherDataJSON.main.pressure);
                            var pressure_unit = "hPa";
                            switch (configuration.pressure_unit){
                              case 1:
                                pressure = Math.round(pressure/1.333);
                                pressure_unit = "mmHg";
                                break;
                              case 2:
                                pressure = Math.round(pressure/33.86389*100)/100;
                                pressure_unit = "inHg";
                                break;
                            }

                            var humidity = Math.round(WeatherDataJSON.main.humidity);

                            var speed_unit_conversion_factor = 1;
                            if (configuration.speed_unit === 0){
                              speed_unit_conversion_factor = 3.6; //m/s -> km/h
                            } else if (configuration.speed_unit == 1){
                              speed_unit_conversion_factor = 2.236; //m/s -> mph
                            }
                            var wind_speed = WeatherDataJSON.wind.speed*speed_unit_conversion_factor;
                            if (wind_speed < 10){
                              wind_speed = Math.round(wind_speed*10)/10;
                            } else {
                              wind_speed = Math.round(wind_speed);
                            }
                            var wind_speed_unit = "m/s";
                            if (configuration.speed_unit === 0) wind_speed_unit = "km/h";
                            if (configuration.speed_unit == 1) wind_speed_unit = "mph";

                            var sunrise_unix = WeatherDataJSON.sys.sunrise;
                            var sunset_unix  = WeatherDataJSON.sys.sunset;
                            var sunrise = timeConverter(Math.round(sunrise_unix));
                            var sunset  = timeConverter(Math.round(sunset_unix));
                            //sunrise_unix = sunrise_unix - utc_offset;
                            //sunset_unix  = sunset_unix  - utc_offset;

                            var time_of_last_data = Number(WeatherDataJSON.dt);

                            // Location:
                            var location_name = WeatherDataJSON.name;
                            var warn_location = 0;
                            if ((configuration.autodetect_loc) && (use_default)){ //tried autodection of location, but could not get the lat long values from phone, so used default location set by the user.
                              warn_location = 2;
                            }
                            if ((configuration.autodetect_loc === 0) && (use_default === 0)){ //detected location, but used user input
                              if ((Math.abs(WeatherDataJSON.coord.lat - pos_lat) > 0.3) && (Math.abs(WeatherDataJSON.coord.lon - pos_lon) > 0.5)){
                                warn_location = 1;
                              }
                            }

                            // TIME:

                            // Get Min/Max temp. from forecast:
                            var Forecast = {
                              TempMin: 10000, // in Kelvin
                              TempMax:     0  // in Kelvin
                            };
                            if (!ForecastDataJSON_error){
                              var i;
                              for (i = 0; i < Math.min(ForecastDataJSON.cnt, 8); i++) { // 8 entries means 24 hours for 3 hour forecast
                                Forecast.TempMin = Math.min(ForecastDataJSON.list[i].main.temp, Forecast.TempMin);
                                Forecast.TempMax = Math.max(ForecastDataJSON.list[i].main.temp, Forecast.TempMax);
                              }
                            }



                            var weather_Line_1 = "";
                            var weather_Line_2 = "";
                            var weather_Line_3 = "";
                            var weather_Line_4 = "";


                            switch (configuration.weatherLine1){
                              case 1:
                                weather_Line_1 = conditions;
                                break;
                              case 2:
                                weather_Line_1 = wind_speed + " " + wind_speed_unit;
                                break;
                              case 3:
                                weather_Line_1 = humidity + " % RH";
                                break;
                              case 4:
                                weather_Line_1 = pressure + " " + pressure_unit;
                                break;
                              case 5:
                                if ((Forecast.TempMin == 10000) || (Forecast.TempMax === 0)){
                                  weather_Line_1 = " --/-- ";
                                } else {
                                  if (configuration.degree_f){
                                    weather_Line_1 = Math.round((Forecast.TempMax-273.15)*1.8+32) + "°/" + Math.round((Forecast.TempMin-273.15)*1.8+32) + "°F";
                                  } else {
                                    weather_Line_1 = Math.round((Forecast.TempMax-273.15)) + "°/" + Math.round((Forecast.TempMin-273.15)) + "°C";
                                    //weather_Line_1 = Math.round((Forecast.TempMax-273.15)) + "/" + Math.round((Forecast.TempMin-273.15)) + "C";
                                  }
                                }
                                break;
                            }

                            switch (configuration.weatherLine2){
                              case 1:
                                weather_Line_2 = conditions;
                                break;
                              case 2:
                                weather_Line_2 = wind_speed + " " + wind_speed_unit;
                                break;
                              case 3:
                                weather_Line_2 = humidity + " % RH";
                                break;
                              case 4:
                                weather_Line_2 = pressure + " " + pressure_unit;
                                break;
                              case 5:
                                if ((Forecast.TempMin == 10000) || (Forecast.TempMax === 0)){
                                  weather_Line_2 = " --/-- ";
                                } else {
                                  if (configuration.degree_f){
                                    weather_Line_2 = Math.round((Forecast.TempMax-273.15)*1.8+32) + "°/" + Math.round((Forecast.TempMin-273.15)*1.8+32) + "°F";
                                  } else {
                                    weather_Line_2 = Math.round((Forecast.TempMax-273.15)) + "°/" + Math.round((Forecast.TempMin-273.15)) + "°C";
                                  }
                                }
                                break;
                            }



                            switch (configuration.weatherLine3){
                              case 1:
                                weather_Line_3 = conditions;
                                break;
                              case 2:
                                weather_Line_3 = wind_speed + " " + wind_speed_unit;
                                break;
                              case 3:
                                weather_Line_3 = humidity + " %";
                                break;
                              case 4:
                                weather_Line_3 = pressure + " " + pressure_unit;
                                break;
                              case 5:
                                if ((Forecast.TempMin == 10000) || (Forecast.TempMax === 0)){
                                  weather_Line_3 = " --/-- ";
                                } else {
                                  if (configuration.degree_f){
                                    weather_Line_3 = Math.round((Forecast.TempMax-273.15)*1.8+32) + "°/" + Math.round((Forecast.TempMin-273.15)*1.8+32) + "°F";
                                  } else {
                                    weather_Line_3 = Math.round((Forecast.TempMax-273.15)) + "°/" + Math.round((Forecast.TempMin-273.15)) + "°C";
                                  }
                                }
                                break;
                            }



                            switch (configuration.weatherLine4){
                              case 1:
                                weather_Line_4 = conditions;
                                break;
                              case 2:
                                weather_Line_4 = wind_speed + " " + wind_speed_unit;
                                break;
                              case 3:
                                weather_Line_4 = humidity + " %";
                                break;
                              case 4:
                                weather_Line_4 = pressure + " " + pressure_unit;
                                break;
                              case 5:
                                if ((Forecast.TempMin == 10000) || (Forecast.TempMax === 0)){
                                  weather_Line_4 = " --/-- ";
                                } else {
                                  if (configuration.degree_f){
                                    weather_Line_4 = Math.round((Forecast.TempMax-273.15)*1.8+32) + "°/" + Math.round((Forecast.TempMin-273.15)*1.8+32) + "°F";
                                  } else {
                                    weather_Line_4 = Math.round((Forecast.TempMax-273.15)) + "°/" + Math.round((Forecast.TempMin-273.15)) + "°C";
                                  }
                                }
                                break;
                            }

                            var weather_string_1 = weather_Line_1;
                            var weather_string_2 = weather_Line_3 + " / " + weather_Line_4; //TODO: what should be on this string?
                            if (configuration.weatherLine3 === 0) weather_string_2 = weather_Line_4;
                            if (configuration.weatherLine4 === 0) weather_string_2 = weather_Line_3;

                            if (CLOUDPEBBLE) {
                              weather_string_1 = (weather_string_1.replace('°', '__')).replace('°', '__');
                              weather_string_2 = (weather_string_2.replace('°', '__')).replace('°', '__');
                            }

                            if (configuration.autodetect_loc == 2) warn_location = 0;

                            // Assemble dictionary using our keys
                            var dictionary = {
                              "KEY_LOCATION_NAME": location_name,
                              "KEY_LOCATION_LAT": Math.round(pos.coords.latitude*1000000),
                              "KEY_LOCATION_LON": Math.round(pos.coords.longitude*1000000),
                              "KEY_WEATHER_TEMP": temperature,
                              "KEY_WEATHER_STRING_1": weather_string_1,
                              "KEY_WEATHER_STRING_2": weather_string_2,
                              "KEY_WEATHER_ICON": conditions_icon,
                              "KEY_TIME_UTC_OFFSET": utc_offset,
                              "KEY_TIME_ZONE_NAME": getTimeZone(),
                              "KEY_SUN_RISE": sunrise,
                              "KEY_SUN_SET": sunset,
                              "KEY_SUN_RISE_UNIX": sunrise_unix,
                              "KEY_SUN_SET_UNIX": sunset_unix, //both converted to local time zone
                              "KEY_WEATHER_DATA_TIME": time_of_last_data,
                              "KEY_WARN_LOCATION": warn_location,
                              "KEY_TRANSIT_STOP_1": formatTransitTime(busTimes1, 1),
                              "KEY_TRANSIT_STOP_2": formatTransitTime(busTimes2, 2),
                              "KEY_TRANSIT_STOP_3": formatTransitTime(busTimes3, 3),
                              "KEY_TRANSIT_STOP_4": formatTransitTime(busTimes4, 4)
                            };

                            // Send to Pebble

                            Pebble.sendAppMessage(dictionary,
                                                  function(e) {
                                                  },
                                                  function(e) {
                                                  }
                                                 );

                            //var dictionary2 = {
                              /*"KEY_LOCATION_NAME": location_name,
                              "KEY_LOCATION_LAT": Math.round(pos.coords.latitude*1000000),
                              "KEY_LOCATION_LON": Math.round(pos.coords.longitude*1000000),
                              "KEY_WEATHER_TEMP": temperature,
                              */ //"KEY_WEATHER_STRING_1": weather_string_1,
                            //  "KEY_WEATHER_STRING_2": weather_string_2
                            /*,
                              "KEY_TIME_UTC_OFFSET": utc_offset,
                              "KEY_TIME_ZONE_NAME": getTimeZone(),
                              "KEY_SUN_RISE": sunrise,
                              "KEY_SUN_SET": sunset*/
                            //};
                            /*
                            Pebble.sendAppMessage(dictionary2,
                                                  function(e) {
                                                  },
                                                  function(e) {
                                                  }
                                                 );
                              */
                          } else { //end: if (!WeatherDataJSON_error)

                            var weather_string_1 = WeatherDataJSON_error_str;
                            var weather_string_2 = "E01: OWM Data error.";

                            // Assemble dictionary using our keys
                            var dictionary = {
                              "KEY_WEATHER_STRING_1": weather_string_1,
                              "KEY_WEATHER_STRING_2": weather_string_2,
                              "KEY_TIME_UTC_OFFSET": utc_offset,
                              "KEY_TIME_ZONE_NAME": getTimeZone()
                            };

                            Pebble.sendAppMessage(dictionary,
                                                  function(e) {
                                                  },
                                                  function(e) {
                                                  }
                                                 );
                          }
                          var date = new Date();

                          ForecastDataJSON = {};
                          WeatherDataJSON  = {};

                          //---------------------------------------------------------------------------------------------------
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
}

function getTimeZone() {
    return /\((.*)\)/.exec(new Date().toString())[1];
}



function timeConverter(UNIX_timestamp){

  var a = new Date(UNIX_timestamp*1000);
  var year = a.getFullYear();
  var month = pad(a.getMonth()+1);
  var date = pad(a.getDate());
  var hour = pad(a.getHours());
  var min = pad(a.getMinutes());
  var sec = pad(a.getSeconds());
  var time = hour + ':' + min;

  /*
  var t = new Date(UNIX_timestamp*1000);
  var log = t.format("dd.mm.yyyy hh:MM:ss");
  var time = t.format("hh:MM");
  */
  return time;
}

function pad(input) {
    //var BASE = "00";
    //return input ? BASE.substr(0, 2 - Math.ceil(input / 10)) + input : BASE;
  if (input < 10){
    return ('0' + input);
  } else return input;
}



function getWeather() {


  if (window.localStorage.getItem("configuration")){
    configuration = JSON.parse(window.localStorage.configuration);
    //var test = JSON.parse(window.localStorage.configuration);
  } else {
  }


  var options = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0
  };
  if (configuration.autodetect_loc == 2){
    var pos = {
      coords: {latitude: 0, longitude: 0}
    };
    SendToPebble(pos, 1);
  } else {
    navigator.geolocation.getCurrentPosition(    //could also use navigator.geolocation.watchPosition() ?
      locationSuccess,
      locationError,
      options
    );
  }
}

// Listen for when the watchface is opened
Pebble.addEventListener('ready',
  function(e) {

    //var i;

    // Get the initial weather
    //getWeather();
  }
);

// Listen for when an AppMessage is received
Pebble.addEventListener('appmessage',
  function(e) {
    getWeather();
  }
);

Pebble.addEventListener("showConfiguration",
  function(e) {
    //Load the remote config page

    /* --> */ Pebble.openURL("https://googledrive.com/host/0B3ivuMdwFLKzfnRGRFRHaXdJbGVRd0FsUElteEVybVZhSHBjM3YzQWRwa0loYUVqaG1JaWM/pebble_m7s_config_v15.3.html");

    //TODO: send some usefull values to the settings page (e. g. location, battery staistics etc.) by adding ?xxx to the URL
  }
);

Pebble.addEventListener("webviewclosed",
  function(e) {
    //Get JSON dictionary
    configuration = JSON.parse(decodeURIComponent(e.response));
    var configuration_str = JSON.stringify(configuration);

    if (configuration_str.charAt(0) == "{" && configuration_str.slice(-1) == "}" && configuration_str.length > 5) {

      window.localStorage.configuration = JSON.stringify(configuration);


      if (typeof configuration.OWM_API_KEY === 'string' || configuration.OWM_API_KEY instanceof String){
        if (configuration.OWM_API_KEY == "default"){
          configuration.OWM_API_KEY = OWM_DEFAULT_API_KEY;
        }
        if (String(configuration.OWM_API_KEY).length < 10){
          configuration.OWM_API_KEY = OWM_DEFAULT_API_KEY;
        }
      } else {
        configuration.OWM_API_KEY = OWM_DEFAULT_API_KEY;
      }


      //Send to Pebble, persist there
      var InvertColors = configuration.invert;
      var LightOn = configuration.light;
      var DisplaySeconds = configuration.display_sec;

      // var date_format_str = configuration.date_format; //"%a, %m.%d.%Y";
      // date_format_str = date_format_str.split('_').join('%');
      date_format_str = "%a, %b %d, %Y";

      Pebble.sendAppMessage(
        {
          "KEY_SET_INVERT_COLOR": InvertColors,
          "KEY_SET_LIGHT_ON": LightOn,
          "KEY_SET_DISPLAY_SEC": DisplaySeconds,
          "KEY_SET_VIBE_DISC": configuration.vibe_disconnect,
          "KEY_SET_COLORED_TMP": configuration.colored_temp,
          "KEY_SET_VIBE_HOUR": configuration.vibe_hour,
          "KEY_SET_DEGREE_F": configuration.degree_f,
          "KEY_SET_DATE_FORMAT": date_format_str,
          "KEY_WEATHER_UPDATE_INT": 1,
          "KEY_SET_TZ_FORMAT": configuration.time_zone_info,
          "KEY_SET_HEALTH": configuration.health_info,
          "KEY_SET_UPDATE_TIME": configuration.show_update_time,
          "KEY_SET_MOON_PHASE": configuration.moon_phase
        },
        function(e) {
        },
        function(e) {
        }
      );
    } else {
    }
  }
);

function formatTransitTime(timesList, favNumber) {
  var stopNames = [TRANSIT_1_NAME, TRANSIT_2_NAME, TRANSIT_3_NAME, TRANSIT_4_NAME];
  if (timesList.length > 0) {
    var formattedTime = "??";

    try {
      var seconds = timesList[0].match(/\"(.*?)\"/)[1];
      if (seconds > 60) {
        formattedTime = Math.round(seconds / 60) + "m";
      } else {
        formattedTime = seconds + "s";
      }
    } catch (e) {}

    return stopNames[favNumber - 1] + ": " + formattedTime;
  }
}
