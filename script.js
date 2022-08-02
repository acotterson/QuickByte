var foodButton = document.getElementById("foodButton");
var restaurantDiv = document.getElementById("restaurant-div")
var favButtons = []
// var clientId = "YYWJyEGNmX3-tIsEH8Pf7w";

var APIKey = "JK2o6xaFthzRfO--_lKdin6AtHopMHSKQogItiUUqiuKs6cv5S9fl4gvHEt0mqDPLLDHDekwyNM5HeI9Oc82S6EiUSSY9wszqG8nYpX13JSTHYGpbVF_qi-veRjaYnYx";
var lat;
var long;

var storedFavorites = JSON.parse(localStorage.getItem("storedFavorites")) || [];
console.log(storedFavorites);



function renderFavorites() {
  $("#favSection").empty();
  var favDivTitle = document.createElement("h2");
  favDivTitle.classList.add("subtitle");
  favDivTitle.textContent = "Favorites";
  $("#favSection").append(favDivTitle);

  console.log(storedFavorites);
  for (let i = 0; i < storedFavorites.length; i++) {
    var favDiv = document.createElement("div");
    var favDiv1 = document.createElement("div");
    var favDiv2 = document.createElement("div");
    favDiv.classList.add("subtitle","is-size-6","columns");
    favDiv.setAttribute("id", `favOption${i}`);
    favDiv1.classList.add("column","is-10");
    favDiv2.classList.add("column", "is-2");


    var name = document.createElement("a");
    var price = document.createElement("p");
    var phone = document.createElement("p");
    var genre = document.createElement("p");

    name.textContent = storedFavorites[i].name;
    name.setAttribute("href", storedFavorites[i].link);
    name.setAttribute("target", "_blank");
    // name.style.position = 'absolute';
    name.style.left = '1.5em';
    price.textContent = storedFavorites[i].price;
    phone.textContent = storedFavorites[i].phone;
    genre.textContent = storedFavorites[i].genre;


    var removeFavButton = document.createElement("button");
    removeFavButton.innerHTML = "&#x2715;";
    removeFavButton.classList.add("button","is-small","is-danger");
    removeFavButton.style.fontSize = '5px';
    removeFavButton.style.display = 'inline';
    // removeFavButton.style.postion = 'absolute';
    removeFavButton.style.top = '1em';
    removeFavButton.style.right = '4em';
    removeFavButton.setAttribute("id", `removeFavButton${i}`);
    removeFavButton.setAttribute("onClick", `removeFavorite(${i})`);



    favDiv2.append(removeFavButton);
    favDiv1.append(name);
    favDiv1.append(genre);
    favDiv1.append(phone);
    favDiv1.append(price);

    favDiv.append(favDiv1);
    favDiv.append(favDiv2);




    $("#favSection").append(favDiv);
  }
}

renderFavorites()

function removeFavorite(favID) {
  console.log(favID);
  storedFavorites.splice(favID, 1);
  localStorage.setItem("storedFavorites", JSON.stringify(storedFavorites));

  renderFavorites();
}

function addFavorite(favButtonID) {
  // console.log(favButtonID)
  var selectedFavButton = document.getElementById(favButtonID);
  var thisOption = selectedFavButton.parentElement;
  // console.log(thisOption)
  var storageObject = {
    link: thisOption.children[0].href,
    name: thisOption.children[0].textContent,
    genre: thisOption.children[1].textContent,
    phone: thisOption.children[2].textContent,
    price: thisOption.children[3].textContent
  }

  console.log(storageObject);
  storedFavorites.push(storageObject);
  console.log(storedFavorites);
  localStorage.setItem("storedFavorites", JSON.stringify(storedFavorites));
  renderFavorites();
}

var dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function (event) {
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
  navigator.geolocation.getCurrentPosition(function (position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    // var yelp = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=" + cat + "&limit=6&open_now=true&latitude=" + lat + "&longitude=" + long;
    var yelp = "https://api.yelp.com/v3/businesses/search?categories=" + cat + "&limit=6&open_now=true&latitude=" + lat + "&longitude=" + long;
    $.ajax({
      url: yelp,
      headers: {
        "Authorization": 'Bearer JK2o6xaFthzRfO--_lKdin6AtHopMHSKQogItiUUqiuKs6cv5S9fl4gvHEt0mqDPLLDHDekwyNM5HeI9Oc82S6EiUSSY9wszqG8nYpX13JSTHYGpbVF_qi-veRjaYnYx',
        "accept": "application/json",
        "x-requested-with": "xmlhttprequest",
        "Access-Control-Allow-Origin": "*",
      }
    }).then(function (data) {
      console.log(data)

      for (let i = 0; i < data.businesses.length; i++) {
        var optionDiv = document.createElement("div");
        optionDiv.classList.add("subtitle","card", "is-size-6");
        optionDiv.setAttribute("id", `option${i}`);

        var cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        var name = document.createElement("a");
        var price = document.createElement("p");
        var phone = document.createElement("p");
        var genre = document.createElement("p");
        var favButton = document.createElement("button");

        name.textContent = data.businesses[i].name;
        name.setAttribute("href", data.businesses[i].url);
        name.setAttribute("target", "_blank");
        name.classList.add("content","button-result");
        price.textContent = data.businesses[i].price;
        price.classList.add("content");
        phone.textContent = data.businesses[i].display_phone;
        phone.classList.add("content");
        genre.textContent = data.businesses[i].categories[0].title;
        genre.classList.add("content");

        favButton.textContent = "Add to Favorites";
        favButton.classList.add("button", "is-warning", "is-small", "is-size-6");
        favButton.setAttribute("id", `favButton${i}`)
        favButton.setAttribute('onClick', 'addFavorite(this.id)');
        // favButtons.append(favButton);

        cardContent.append(name);
        cardContent.append(genre);
        cardContent.append(phone);
        cardContent.append(price);
        cardContent.append(favButton);

        optionDiv.append(cardContent);

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
