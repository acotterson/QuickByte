// global variables
var foodButton = document.getElementById("foodButton");
var restaurantDiv = document.getElementById("restaurant-div");
var favButtons = [];
var dropdown = document.querySelector('.dropdown');
var storedFavorites = JSON.parse(localStorage.getItem("storedFavorites")) || [];
var button = document.getElementById("get-location");

// create the necessary elements from the locally stored favorites list and print them to the screen
function renderFavorites() {
  $("#favSection").empty();

  // display the section title
  var favDivTitle = document.createElement("h2");
  favDivTitle.classList.add("subtitle");
  favDivTitle.textContent = "Favorites";
  $("#favSection").append(favDivTitle);

  // loop through locally stored favorites list and create elements to display them
  console.log(storedFavorites);
  for (let i = 0; i < storedFavorites.length; i++) {
    // create a container div, a div for the favorite, and a div for the delete button
    var favDiv = document.createElement("div");
    var favDiv1 = document.createElement("div");
    var favDiv2 = document.createElement("div");
    favDiv.classList.add("subtitle","is-size-6","columns", "is-mobile" );
    favDiv.setAttribute("id", `favOption${i}`);
    favDiv1.classList.add("column","is-10");
    favDiv2.classList.add("column", "is-2");

    // populate the favorite information
    var name = document.createElement("a");
    var price = document.createElement("p");
    var phone = document.createElement("p");
    var genre = document.createElement("p");

    name.textContent = storedFavorites[i].name;
    name.setAttribute("href", storedFavorites[i].link);
    name.setAttribute("target", "_blank");
    name.style.left = '1.5em';
    price.textContent = storedFavorites[i].price;
    phone.textContent = storedFavorites[i].phone;
    genre.textContent = storedFavorites[i].genre;

    // add the delete button to the right
    var removeFavButton = document.createElement("button");

    removeFavButton.innerHTML = "&#x2715;";
    removeFavButton.classList.add("button","is-small","is-danger");
    removeFavButton.style.fontSize = '5px';
    removeFavButton.style.display = 'inline';
    removeFavButton.style.top = '1em';
    removeFavButton.style.right = '4em';
    removeFavButton.setAttribute("id", `removeFavButton${i}`);
    removeFavButton.setAttribute("onClick", `removeFavorite(${i})`);


    // put everything together and add it to the page to display
    favDiv2.append(removeFavButton);
    favDiv1.append(name);
    favDiv1.append(genre);
    favDiv1.append(phone);
    favDiv1.append(price);

    favDiv.append(favDiv1);
    favDiv.append(favDiv2);

    $("#favSection").append(favDiv);
  };
};

// remove a favorite using the id sent by the button click
function removeFavorite(favID) {
  // remove the favorite from the list
  storedFavorites.splice(favID, 1);
  // update the local storage
  localStorage.setItem("storedFavorites", JSON.stringify(storedFavorites));
  // update the display
  renderFavorites();
};

// add a favorite using the id sent by the button click
function addFavorite(favButtonID) {
  var selectedFavButton = document.getElementById(favButtonID);
  // grab the information in the restaurant card containing the favorite button that was clicked
  var thisOption = selectedFavButton.parentElement;
  // create a favorite object with all the pertinent information
  var storageObject = {
    link: thisOption.children[0].href,
    name: thisOption.children[0].textContent,
    genre: thisOption.children[1].textContent,
    phone: thisOption.children[2].textContent,
    price: thisOption.children[3].textContent
  };

  // add the favorite object to local storage and update the display
  storedFavorites.push(storageObject);
  localStorage.setItem("storedFavorites", JSON.stringify(storedFavorites));
  renderFavorites();
};

// take care of dropdown menu functionality
dropdown.addEventListener('click', function (event) {
  event.stopPropagation();
  dropdown.classList.toggle('is-active');
});

// handle user selection of a food category from the dropdown menu
function foodOptions() {
  var cat = $(this).attr("id");
  $("#restaurant-div").empty();

  // get the user position from their device gps
  navigator.geolocation.getCurrentPosition(function (position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    // yelp url uses the herokuapp to generate temporary access through "cors" security, goes through the category search functionality of the API,
    // and uses the selected category and latitude and longtitude to pull up 6 relevant results in a 5 mile radius that are open at the time of search
    var yelp = "https://bootcamp-cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?categories=" + cat + "&limit=6&open_now=true&latitude=" + lat + "&longitude=" + long + "&radius=3220";
    // make a call to the yelp api using an api key and a header that yelp requires
    $.ajax({
      url: yelp,
      headers: {
        "Authorization": 'Bearer JK2o6xaFthzRfO--_lKdin6AtHopMHSKQogItiUUqiuKs6cv5S9fl4gvHEt0mqDPLLDHDekwyNM5HeI9Oc82S6EiUSSY9wszqG8nYpX13JSTHYGpbVF_qi-veRjaYnYx',
        "accept": "application/json",
        "x-requested-with": "xmlhttprequest",
        "Access-Control-Allow-Origin": "*",
      }
    }).then(function (data) {
      // create a card for each restaurant result
      for (let i = 0; i < data.businesses.length; i++) {
        // add a div to hold the result and set bulma classes to make it a card
        var optionDiv = document.createElement("div");
        optionDiv.classList.add("subtitle","card", "is-size-6");
        optionDiv.setAttribute("id", `option${i}`);

        // add div for content of card
        var cardContent = document.createElement("div");
        cardContent.classList.add("card-content");

        var name = document.createElement("a");
        var price = document.createElement("p");
        var phone = document.createElement("p");
        var genre = document.createElement("p");
        var favButton = document.createElement("button");

        // add the card content based on the info retrieved from the API
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

        // add the button to save this restaurant to local storage as a favorite
        favButton.textContent = "Add to Favorites";
        favButton.classList.add("button", "is-warning", "is-small", "is-size-6");
        favButton.setAttribute("id", `favButton${i}`);
        // set up the favorite button to run the "addFavorites" button with the id as the argument
        favButton.setAttribute('onClick', 'addFavorite(this.id)');

        // put the card content together
        cardContent.append(name);
        cardContent.append(genre);
        cardContent.append(phone);
        cardContent.append(price);
        cardContent.append(favButton);

        // add the content to the card
        optionDiv.append(cardContent);

        // add the card to the restaurant div of the page
        restaurantDiv.append(optionDiv);
      };
    });
  });
  renderFavorites();
};

$(".dropdown-menu").on("click", "button", foodOptions);
renderFavorites();