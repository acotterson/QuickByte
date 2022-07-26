var foodButton = document.getElementById("foodButton")
var movies = ["Doctor Sleep", "The Notebook", "Coraline", "The Room", "The Fugitive", "Armageddon", "The Ten Commandments", "It (1990)", "Office Space"]

// var clientId = "YYWJyEGNmX3-tIsEH8Pf7w";

var APIKey = "JK2o6xaFthzRfO--_lKdin6AtHopMHSKQogItiUUqiuKs6cv5S9fl4gvHEt0mqDPLLDHDekwyNM5HeI9Oc82S6EiUSSY9wszqG8nYpX13JSTHYGpbVF_qi-veRjaYnYx";
var lat;
var long;
var yelp = "https://api.yelp.com/v3/businesses/search?catagories=food,desserts&limit=10&open_now=true&latitutde="+ lat +"&longitude=" + long;

var button = document.getElementById("get-location");
// var latText = document.getElementById("latitude");
// var longText = document.getElementById("longitude");

foodButton.addEventListener("click", foodOptions())

function foodOptions() {
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    fetch(yelp, {
      header: {
        authorization: "Bearer JK2o6xaFthzRfO--_lKdin6AtHopMHSKQogItiUUqiuKs6cv5S9fl4gvHEt0mqDPLLDHDekwyNM5HeI9Oc82S6EiUSSY9wszqG8nYpX13JSTHYGpbVF_qi-veRjaYnYx"
      }
    }).then(function (response){
      return response.json()
    }).then(function(data){
      console.log(data)
    })
    
    console.log(lat.toFixed(2))
    console.log(long.toFixed(2))
    // latText.innerText = lat.toFixed(2);
    // longText.innerText = long.toFixed(2);
  });
};