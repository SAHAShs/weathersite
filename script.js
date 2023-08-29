/** api information */
const APIkey = "41e116c03c5d13cefb7947d48e82cb53";
const APIurl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

/** selecting some class to edit after search */
const cityInput = document.querySelector(".city-input");

const searchButton = document.querySelector(".serach-button");
const wimag = document.querySelector(".w-img");
const description = document.querySelector(".description");
const Invalid = document.querySelector(".invalid");


/** getting the user entered value when seachbutton is clicked */
searchButton.addEventListener("click", () => {
    const city = cityInput.value;
    checkwheather(city);
    //reset the input field
    cityInput.value=''
});

/** main function which controlls all functionality */
async function checkwheather(cityname) {
    /** getting response from api */
    const response = await fetch(APIurl + `&q=${cityname}&appid=${APIkey}`)
    /** if response is a bad request handling it */
    if (response.status == 404) {
        Invalid.style.visibility = 'visible';
        Invalid.innerHTML = "Invalid city......!"
       
        setInterval(() => {
            var get = document.querySelector('.invalid');
            get.style.visibility = 'hidden';
        }, 2000)
    }

    /** converting response to json to access the neccessary fields */
    var data = await response.json();

    //console.log(data)
    /** converting time from timestamp to standard time */
    const pad = num => ("0" + num).slice(-2);
    const getTimeFromDate = timestamp => {
        const date = new Date(timestamp * 1000);
        let hours = date.getHours(),
            minutes = date.getMinutes(),
            seconds = date.getSeconds();
        return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds)
    }

    /** setting approriate values to fields */
    document.querySelector(".city-name").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".desc-humidity-percent").innerHTML = data.main.humidity + "%";
    document.querySelector(".desc-wind-speed").innerHTML = data.wind.speed + "km/h";
    description.innerHTML = data.weather[0].description;
    const sunriseTime = getTimeFromDate(data.sys.sunrise);
    const sunsetTime = getTimeFromDate(data.sys.sunset);
    document.querySelector(".desc-sunrise").innerHTML = sunriseTime;
    document.querySelector(".desc-sunset").innerHTML = sunsetTime;

/** changing images based on climate */
    if (data.weather[0].main == "Clouds") {
        wimag.src = "images/cloudy.png"
    }
    else if (data.weather[0].main == "Rain") {
        wimag.src = "images/heavy-rain.png"
    }
    else if (data.weather[0].main == "Clear") {
        wimag.src = "images/clear-sky.png"
    }
    else if (data.weather[0].main == "Mist") {
        wimag.src = "images/haze.png"
    }
    else if (data.weather[0].main == "Drizzle") {
        wimag.src = "images/drizzle.png"
    }
    else if (data.weather[0].main == "Snow") {
        wimag.src = "images/snowman.png"
    }
    else if (data.weather[0].main == "Thunderstorm") {
        wimag.src = "images.thunderstorm.png"
    }
}


