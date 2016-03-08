$(document).ready(function() {
  var lat = "";
  var long = "";
  var temp = "";
  var units = "°F";
  var icon = "";
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude
      long = position.coords.longitude;

      $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&APPID=8722afcf35360fafa45a494291f3b1b6&units=imperial', function(weather) {
        $('#weather').text(weather.weather[0].description);
        temp = weather.main.temp;
        $('#temperature').text(temp + units);
        $('#location').text(weather.name + ", " + weather.sys.country);
        icon = weather.weather[0].icon;
        $('#icon').html("<img src=http://openweathermap.org/img/w/" + icon + ".png>");
        // This changes the temperature units
        $('#temperature').on("click", function() {
          if (units == "°F") {
            units = "°C";
            temp = Math.round((temp - 32) * 5 / 9 * 100) / 100;
            $('#temperature').text(temp + units);
          } else if (units == "°C") {
            units = "°F";
            temp = Math.round(((temp * 9 / 5) + 32) * 100) / 100;
            $('#temperature').text(temp + units);
          }
        });
      }); //end of weather api
    }); //end of location function 
  } // end of location if
});