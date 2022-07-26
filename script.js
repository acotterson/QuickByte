var foodButton = document.getElementById("foodButton");
var restaurantDiv = document.getElementById("restaurant-div")
var movies = ["Doctor Sleep", "The Notebook", "Coraline", "The Room", "The Fugitive", "Armageddon", "The Ten Commandments", "It (1990)", "Office Space"]

// var clientId = "YYWJyEGNmX3-tIsEH8Pf7w";

var APIKey = "JK2o6xaFthzRfO--_lKdin6AtHopMHSKQogItiUUqiuKs6cv5S9fl4gvHEt0mqDPLLDHDekwyNM5HeI9Oc82S6EiUSSY9wszqG8nYpX13JSTHYGpbVF_qi-veRjaYnYx";
var lat;
var long;

var button = document.getElementById("get-location");
// var latText = document.getElementById("latitude");
// var longText = document.getElementById("longitude");

foodButton.addEventListener("click", foodOptions())

function foodOptions() {
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    var yelp = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?catagories=food,desserts&limit=10&open_now=true&latitude="+ lat +"&longitude=" + long;
    $.ajax( {
      url:yelp,
      headers: {
        "Authorization": 'Bearer JK2o6xaFthzRfO--_lKdin6AtHopMHSKQogItiUUqiuKs6cv5S9fl4gvHEt0mqDPLLDHDekwyNM5HeI9Oc82S6EiUSSY9wszqG8nYpX13JSTHYGpbVF_qi-veRjaYnYx',
        "accept": "application/json",
        "x-requested-with": "xmlhttprequest",
        "Access-Control-Allow-Origin":"*",
      }
    }).then(function(data){
      console.log(data)

      for (let i = 0; i < data.length; i++){
        var optionDiv = document.createElement("div");
        optionDiv.addClass("container");
        var name = document.createElement("h3")
        var price = document.createElement("p")
        var phone = document.createElement("p")
        var genre = document.createElement("p")

        name.textContent = data.businesses.name.value;
        price.textContent = data.businesses.price.value;
        phone.textContent = data.businesses.display_phone.value;
        genre.textContent = data.businesses.categories[0].title.value;

        optionDiv.append(name);
        optionDiv.append(price);
        optionDiv.append(phone);
        optionDiv.append(genre);

        restaurantDiv.append(optionDiv);

        console.log(data.businesses.name.value);
      }

    })
    
    console.log(lat.toFixed(2))
    console.log(long.toFixed(2))
    // latText.innerText = lat.toFixed(2);
    // longText.innerText = long.toFixed(2);
  });
};