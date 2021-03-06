// console.log("Here be linked")

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city

var cityName = "";

$("#log").on("click", function (event) {
    event.preventDefault();
    cityName = $(this).prev().val();
    // console.log(cityName);
    loadData(cityName)
})

// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

function loadData(x) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + x + "&units=imperial&appid=ce311efbdbffb6909509e8536494ecba";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            // console.log(queryURL);
            // console.log(response);
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var coordsURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=ce311efbdbffb6909509e8536494ecba"
            $.ajax({
                url: coordsURL,
                method: "GET"
            }).then(function (answer) {// WHEN I view future weather conditions for that city
                // console.log(answer);
                for (var i = 0; i < 5; i++) {// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
                    $("#title" + i).text(dateFormat(parseInt(answer.daily[i].dt)));// WHEN I click on a city in the search history
                    $("#weatherIcon" + i).attr("src", `http://openweathermap.org/img/wn/${answer.daily[i].weather[0].icon}@4x.png`);
                    $("#temp" + i).text(answer.daily[i].temp.day + " °F");// THEN I am again presented with current and future conditions for that city
                    $("#hum" + i).text(answer.daily[i].humidity + "% humidity")
                }
                // console.log(answer.current.uvi);
                $(".current-uv").text(`UV: ${answer.current.uvi}`)
            })
            $("#city-date").text(`City Name: ${response.name}`);
            $(".current-temp").text(`Temperature: ${response.main.temp} °F`);
            $(".current-hum").text(`Humidity: ${response.main.humidity}%`);
            $(".current-wind").text(`Wind Speed: ${response.wind.speed}`);
            $("#weatherIcon").attr("src", `http://openweathermap.org/img/wn/${response.weather[0].icon}@4x.png`)
        })
}

function dateFormat(sequence) {
    // console.log(sequence)
    var myDate = new Date(sequence * 1000);
    var day = myDate.getDate();
    var month = myDate.getMonth() + 1;
    var year = myDate.getFullYear();
    return month + "/" + day + "/" + year
}




var searchHist = JSON.parse(localStorage.getItem('latest-city')) || []

$("#log").on("click", function (event) {
    event.preventDefault();
    var city = $("#city").val();
    // console.log(city)
    searchHist.unshift(city)
    // console.log(searchHist)
    localStorage.setItem('latest-city', JSON.stringify(searchHist))
    showHist()
})

$(document).on("click", ".histBtn", function () {
    loadData($(this).text())
})
function showHist() {// WHEN I open the weather dashboard
    // THEN I am presented with the last searched city forecast
    $("#search-history").empty()
    for (i = 0; i < searchHist.length; i++) {
        // console.log(searchHist[i])
        var div = $("<div>").addClass("histBtn")
        div.text(searchHist[i])
        $("#search-history").append(div)
    }
}
showHist();