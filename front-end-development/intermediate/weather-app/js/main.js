$(document).ready(function () {
    
    function roundTo2Decimals(temp) {
        return Math.round(temp * 100) / 100;
    } //end roundTo2Decimals()
    
    //Helper functions
    function celsiusToFahrenheit(temp) {
        return roundTo2Decimals(temp * 9 / 5 + 32);
    } //end celsiusToFahrenheit  
  
    function fahrenheitToCelsius(temp) {
        return roundTo2Decimals((temp - 32) * 5 / 9);
    }
  
    function getFormattedTime(time) {
                  
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date, hours, minutes, seconds, formattedTime;
        date = new Date(time * 1000);
        // Hours part from the timestamp
        hours = date.getHours();
        // Minutes part from the timestamp
        minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        formattedTime = hours + ':' + minutes.substr(-2);
            
        return formattedTime;
                    
    } //end getFormattedTime()
    
    function kelvinToCelsius(temp) {
        return Math.round(temp - 273);
    } //end kelvinToCelsius()
  
    
  
  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
      
            var latitude, longitude;
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            
            /*
              //Cleveland, US
              var latitude = 41.505493;
              var longitude = -81.681290;

              //London, UK
              var latitude = 51.507351;
              var longitude = -0.127758;
              
              //Cairo, EG
              var latitude = 30.044420;
              var longitude = 31.235712;

              //Kuala Lumpur, MY
              var latitude = 3.139003;
              var longitude = 101.686855;

              //Vladivostok, RU
              var latitude = 43.173739;
              var longitude = 132.006451;

              //Aukland, NZ
              var latitude = -36.848460;
              var longitude = 174.763332;

              //Barrio, Brazil
              var latitude = -33.448890;
              var longitude = -70.669265;
              */

      
            var openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=44db6a862fba0b067b1930da0d769e98";
    
            $.getJSON(openWeatherURL, function (json) {
      
                var temperature = kelvinToCelsius(roundTo2Decimals(json["main"]["temp"]));
                var weatherDesc = json["weather"][0]["description"];
                weatherDesc = weatherDesc.substr(0, 1).toUpperCase() + weatherDesc.substr(1);

                //row1      
                var humidity = json["main"]["humidity"];
                var windSpeed = json["wind"]["speed"];

                //row2  
                var city = json["name"];
                var country = json["sys"]["country"];
                var location = city + ", " + country;

                //row3
                var longitude = json["coord"]["lon"];
                var latitude = json["coord"]["lat"];

                //row4
                var tempMin = kelvinToCelsius(roundTo2Decimals(json["main"]["temp_min"]));
                var tempMax = kelvinToCelsius(roundTo2Decimals(json["main"]["temp_max"]));

                //row5
                var sunrise = getFormattedTime(json["sys"]["sunrise"]);
                var sunset = getFormattedTime(json["sys"]["sunset"]);

                  /*Weather icons:
                  Types of weather
                  1. thunderstorm
                  2. snow
                  3. rain
                  4. mist
                  5. clouds
                  6. clear sky
                  */

              var weatherType = 0;
              if (weatherDesc.indexOf("thunder") > -1)
                weatherType = 1;
              else if (weatherDesc.indexOf("snow") > -1)
                weatherType = 2;
              else if (weatherDesc.indexOf("rain") > -1)
                weatherType = 3;
              else if (weatherDesc.indexOf("mist") > -1)
                weatherType = 4;
              else if (weatherDesc.indexOf("cloud") > -1)
                weatherType = 5;
              else if (weatherDesc.indexOf("clear") > -1)
                weatherType = 6;
      
              var bckgImg = "", weatherIcon = "";
              switch (weatherType)
                {
                  case 1: bckgImg = "https://pixabay.com/static/uploads/photo/2015/07/27/14/23/flash-862620_960_720.jpg";
                          weatherIcon = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-storm-night-icon.png";
                          break;
                  case 2: bckgImg = "https://pixabay.com/static/uploads/photo/2015/11/05/22/36/blizzard-1025002_960_720.jpg";
                          weatherIcon = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-snow-icon.png";
                          break;
                  case 3: bckgImg = "https://pixabay.com/static/uploads/photo/2016/01/15/09/28/still-1141345_960_720.jpg";
                          weatherIcon = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-showers-scattered-icon.png";
                          break;
                  case 4: bckgImg = "https://pixabay.com/static/uploads/photo/2015/11/07/11/53/mountain-1031602_960_720.jpg";
                          weatherIcon = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-many-clouds-icon.png";
                          break;
                  case 5: bckgImg = "https://pixabay.com/static/uploads/photo/2014/09/30/00/06/storm-466677_960_720.jpg";
                          weatherIcon = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-clouds-icon.png";
                          break;
                  case 6: bckgImg = "https://pixabay.com/static/uploads/photo/2016/01/02/01/51/clouds-1117584_960_720.jpg";
                          weatherIcon = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-clear-icon.png";
                          break;
                  default: bckgImg = "https://pixabay.com/static/uploads/photo/2016/01/02/01/51/clouds-1117584_960_720.jpg";
                           weatherIcon = "http://icons.iconarchive.com/icons/oxygen-icons.org/oxygen/128/Status-weather-clear-icon.png"; 
                }

              $("body").css("background-image", "url( "+ bckgImg + ")");
              $(".temp").css("background-image", "url( " + weatherIcon + ")");
                //update values  

                $(".temp-box-c").html("<h1>" + temperature + " &#xb0;C</h1>");
                $(".weather-desc").html("<h3>" + weatherDesc + "</h3>");

                //row1
                $(".humidity").html("<h4>Humidity: <strong>" + humidity + " %</strong></h4>");
                $(".wind-speed").html("<h4>Wind Speed: <strong>" + windSpeed + " m/s</strong></h4>");

                //row2
                $(".city").html("<h2>" + location + "</h2>");   
                $(".longitude").html("<h3>Longitude: " + longitude + "</h3>");
                $(".latitude").html("<h3>Latitude: " + latitude + "</h3>");

                //row3
                $(".temp-min").html("<h3>Temp(Min): " + tempMin + "&#xb0; C</h3>");
                $(".temp-max").html("<h3>Temp(Max): " + tempMax + "&#xb0; C</h3>");

                //row4
                $(".sunrise").html("<h3>Sunrise: " + sunrise + "</h3>");
                $(".sunset").html("<h3>Sunset: " + sunset + "</h3>");

        },
  
        function (error) { 
          if (error.code >=0 && error.code <= 3)
            $(".location").html("<h2><strong>Unable to fetch your current location. Please allow the browser to access <span style='color: red;'>Geolocation services</span>.</strong></h2>");
        }
  );

}); //end navigator.geolocation if clause
  } 
  else {
        $(".location").html("<h2><strong>Unable to fetch your current location. Please switch to a browser which supports <span style='color: red;'>Geolocation services</span>.</strong></h2>");
  }//end navigator.geolocation if-else clause
  
  //on clikc celsisus to fahrenheit feature
  $(".temp-box-c").on("click", function() {
          var currentClass = $(this).attr("class");

          if (currentClass === "temp-box-c")
          {
            var tempC = $(this).text();
            tempC = tempC.split(" ");
            tempC = tempC[0];
            var tempF = celsiusToFahrenheit(tempC);
            $(this).removeClass("temp-box-c");
            $(this).addClass("temp-box-f");
            $(this).html("<h1>" + tempF + " &#xb0;F</h1>");
          }
          else
          if (currentClass === "temp-box-f")
          {
            var tempF = $(this).text();
            tempF = tempF.split(" ");
            tempF = tempF[0];
            var tempC = fahrenheitToCelsius(tempF);
            $(this).removeClass("temp-box-f");
            $(this).addClass("temp-box-c");
            $(this).html("<h1>" + tempC + " &#xb0;C</h1>");
          }
      
  }); //end on click celsisus to fahrenheit
 
}); // end document ready