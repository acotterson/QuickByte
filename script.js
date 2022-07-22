var movies = ["Doctor Sleep", "The Notebook", "Coraline", "The Room", "The Fugitive", "Armageddon", "The Ten Commandments", "It (1990)", "Office Space"]


var button = document.getElementById("get-location");
// var latText = document.getElementById("latitude");
// var longText = document.getElementById("longitude");

button.addEventListener("click", function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    console.log(lat.toFixed(2))
    console.log(long.toFixed(2))
    // latText.innerText = lat.toFixed(2);
    // longText.innerText = long.toFixed(2);
  });
});