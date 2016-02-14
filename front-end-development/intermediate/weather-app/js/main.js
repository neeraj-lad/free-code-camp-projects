$(document).ready(function () {
  
  var openWeatherURL = "";
  
  
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    openWeatherURL += "http://api.openweathermap.org/data/2.5/weather?lat=" + Math.round(latitude) + "&lon=" + Math.round(longitude) + "&appid=44db6a862fba0b067b1930da0d769e98";
    

    
     
  }); //end navigator.geolocation if clause
}
    $.getJSON(openWeatherURL, function(val){
          
          var location = val["name"];
          $(".location").html("");
          $(".location").html("<h3>" + openWeatherURL + "</h3>");          
    
    }); //end getJSON
}); //end document ready
