console.log("Here be linked")


// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city
// WHEN I open the weather dashboard


// THEN I am presented with the last searched city forecast
var searchHist = []

document.querySelector("#search-city").addEventListener("submit", function (event) {
    event.preventDefault();
    var city = document.querySelector("#city").value
    // console.log(city)
    searchHist.push(city)
    console.log(searchHist)
    localStorage.setItem('latest-city', city)
    document.querySelector("#search-history").innerHTML = ""
    for (i = 0; i < searchHist.length; i++) {
        console.log(searchHist[i])
        var div = document.createElement("div")
        div.textContent = searchHist[i]
        document.querySelector("#search-history").appendChild(div)
    }
})