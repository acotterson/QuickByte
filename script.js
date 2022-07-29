var foodButton = document.getElementById("foodButton");
var restaurantDiv = document.getElementById("restaurant-div")
var movies = ["Doctor Sleep", "The Notebook", "Coraline", "The Room", "The Fugitive", "Armageddon", "The Ten Commandments", "It (1990)", "Office Space"]
var favButtons = []
// var clientId = "YYWJyEGNmX3-tIsEH8Pf7w";

var APIKey = "JK2o6xaFthzRfO--_lKdin6AtHopMHSKQogItiUUqiuKs6cv5S9fl4gvHEt0mqDPLLDHDekwyNM5HeI9Oc82S6EiUSSY9wszqG8nYpX13JSTHYGpbVF_qi-veRjaYnYx";
var lat;
var long;

var storedFavorites = JSON.parse(localStorage.getItem("storedFavorites")) || [];
console.log(storedFavorites);



function renderFavorites(){
  $("#favorites").empty();
  console.log(storedFavorites);
  for ( let i = 0; i < storedFavorites.length; i++){
    var favDiv = document.createElement("div");
        favDiv.classList.add("subtitle");
        favDiv.setAttribute("id", `favOption${i}`);
        favDiv.classList.add("is-size-6");
        
        var name = document.createElement("a");
        var price = document.createElement("p");
        var phone = document.createElement("p");
        var genre = document.createElement("p");

        name.textContent = storedFavorites[i].name;
        name.setAttribute("href", storedFavorites[0].link);
        name.setAttribute("target", "_blank");
        name.style.position = 'absolute';
        name.style.left = '7.5%';
        price.textContent = storedFavorites[i].price;
        phone.textContent = storedFavorites[i].phone;
        genre.textContent = storedFavorites[i].genre;

        
        var removeFavButton = document.createElement("button");
        removeFavButton.innerHTML = "&#x2715;";
        removeFavButton.classList.add("button");
        removeFavButton.classList.add("is-danger");
        removeFavButton.classList.add("is-small");
        removeFavButton.style.fontSize = '5px';
        removeFavButton.style.display = 'inline';
        // removeFavButton.style.postion = 'absolute';
        removeFavButton.style.top = '1em';
        removeFavButton.style.right = '7%';
        removeFavButton.setAttribute("id", `removeFavButton${i}`);
        removeFavButton.setAttribute("onClick", `removeFavorite(${i})`);
        
        

        favDiv.append(removeFavButton);
        favDiv.append(name);
        favDiv.append(genre);
        favDiv.append(phone);
        favDiv.append(price);




        $("#favorites").append(favDiv);
  }
}

renderFavorites()

function removeFavorite(favID) {
  console.log(favID);
  storedFavorites.splice(favID,1);
  localStorage.setItem("storedFavorites", JSON.stringify(storedFavorites)); 

  renderFavorites();
}

function addFavorite(favButtonID){
  // console.log(favButtonID)
  var selectedFavButton = document.getElementById(favButtonID);
  var thisOption = selectedFavButton.parentElement;
  // console.log(thisOption)
  var storageObject = {link: thisOption.children[0].href,
  name: thisOption.children[0].textContent,
  genre: thisOption.children[1].textContent,
  phone: thisOption.children[2].textContent,
  price: thisOption.children[3].textContent}

  console.log(storageObject);
  storedFavorites.push(storageObject);
  console.log(storedFavorites);
  localStorage.setItem("storedFavorites", JSON.stringify(storedFavorites));          
  renderFavorites();
}

var dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function(event) {
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
});


var button = document.getElementById("get-location");
// var latText = document.getElementById("latitude");
// var longText = document.getElementById("longitude");

// foodButton.addEventListener("click", foodOptions)
$(".dropdown-menu").on("click", "button", catHandler)

function catHandler() {
  var cat = $(this).attr("id")
  foodOptions(cat)
}

function foodOptions(cat) {
  $("#restaurant-div").empty();
  navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    var yelp = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=" + cat + "&limit=5&open_now=true&latitude="+ lat +"&longitude=" + long;
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

      for (let i = 0; i < data.businesses.length; i++){
        var optionDiv = document.createElement("div");
        optionDiv.classList.add("subtitle");
        optionDiv.setAttribute("id", `option${i}`);
        
        var name = document.createElement("a");
        var price = document.createElement("p");
        var phone = document.createElement("p");
        var genre = document.createElement("p");
        var favButton = document.createElement("button");
        
        name.textContent = data.businesses[i].name;
        name.setAttribute("href", data.businesses[i].url);
        name.setAttribute("target", "_blank");
        price.textContent = data.businesses[i].price;
        phone.textContent = data.businesses[i].display_phone;
        genre.textContent = data.businesses[i].categories[0].title;
        
        favButton.textContent = "Add to Favorites";
        favButton.classList.add("button");
        favButton.classList.add("is-warning");
        favButton.classList.add("is-small");
        favButton.setAttribute("id", `favButton${i}`)
        favButton.setAttribute('onClick', 'addFavorite(this.id)');
        // favButtons.append(favButton);
        
        optionDiv.append(name);
        optionDiv.append(genre);
        optionDiv.append(phone);
        optionDiv.append(price);
        optionDiv.append(favButton);
        
        name.classList.add("button-result");
        restaurantDiv.append(optionDiv);
        console.log(optionDiv)

        
        
        // name.addEventListener("click", foodPage)
        // function foodPage() {
          // window.open(data.businesses[i].url);
        //   }
        
      }
      
    })
    
    console.log(lat.toFixed(2))
    console.log(long.toFixed(2))
    // latText.innerText = lat.toFixed(2);
    // longText.innerText = long.toFixed(2);
  });
};

