$(document).ready(function(){
  
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var openWeatherURL = "api.openweathermap.org/data/2.5/weather?lat=" + Math.round(latitude) + "&lon=" + Math.round(longitude) + "&appid=44db6a862fba0b067b1930da0d769e98";
    
        $(".data").html(openWeatherURL);
    
    $.getJSON(openWeatherURL, function(val){
      alert(val);
      var keys = Object.keys(val);
      $(".data").html(keys);
    });
     
  });
}
});
