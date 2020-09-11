//api settings
const api = {
    key: "38e06b7ee23bea88a02bf79ab15848b3",
    base: "https://api.openweathermap.org/data/2.5/"
}

//querying data via search button
document.querySelector("button").addEventListener("click", function () {
    getResponse(searchQuery.value);
});

//querying data via search input form
const searchQuery = document.querySelector('.search-query');
searchQuery.addEventListener('keypress', search);

function search(enterKeyEvent) {
    if (enterKeyEvent.keyCode == 13) {
        getResponse(searchQuery.value);
    }
}

//fetching data from api
function getResponse(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayResults);
}

//display response
function displayResults(weather) {
    if (weather.cod === '404') {
        console.log(weather);
        let city = document.querySelector('.location');
        city.innerText = `Data unavailable`;
        let x = document.getElementById("hide");
        x.style.display = "none"; //hide.
    }
    console.log(weather);
    let city = document.querySelector('.location');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let weatherIcon = document.querySelector('.weather-icon');
    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}.png" class="weather-icon">`;

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    let main = document.querySelector('.main');
    main.innerText = weather.weather[0].main;

    let description = document.querySelector('.description');
    description.innerText = weather.weather[0].description;

    let now = new Date();
    let date = document.querySelector('.date');
    date.innerText = dateBuilder(now);

    let feels = document.querySelector('.feels');
    feels.innerHTML = `<span>Feels Like:</span> ${weather.main.feels_like}`;

    let humidity = document.querySelector('.humidity');
    humidity.innerHTML = `<span>Humidity:</span> ${weather.main.humidity}`;

    let visibility = document.querySelector('.visibility');
    visibility.innerHTML = `<span>Visibility</span>${weather.visibility}`;
}

function dateBuilder(d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}