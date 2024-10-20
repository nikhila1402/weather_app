const container = document.querySelector(".container");
const search = document.querySelector(".searchbox button");
const weatherBox = document.querySelector(".weatherbox");
const weatherDetails = document.querySelector(".weatherdetails");
const error404 = document.querySelector(".notfound");

search.addEventListener("click", () => {
    const APIKey = "b41af3bbb37b498012b44ae1b3f1d17d";
    const city = document.querySelector(".searchbox input").value.trim();

    if (city === "") return;

    // Fetch weather data from API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === "404") {
                container.style.height = "400px";
                weatherBox.classList.remove("active");
                weatherDetails.classList.remove("active");
                error404.classList.add("active");
                return;
            }

            error404.classList.remove("active");
            weatherBox.classList.add("active");
            weatherDetails.classList.add("active");

            const image = document.querySelector(".weatherbox img");
            const temperature = document.querySelector(".weatherbox .temperature");
            const description = document.querySelector(".weatherbox .description");
            const humidity = document.querySelector(".weatherdetails .humidity span");
            const wind = document.querySelector(".weatherdetails .wind span");

            // Update weather information
            switch (json.weather[0].main) {
                case "Clear":
                    image.src = "images/clear.jpeg";
                    break;
                case "Rain":
                    image.src = "images/rain.jpeg";
                    break;
                case "Snow":
                    image.src = "images/snow.jifif";
                    break;
                case "Clouds":
                    image.src = "images/cloud.jpeg";
                    break;
                case "Clouds":
                        image.src = "images/cloudy.jpg";
                        break;
                case "Mist":
                case "Haze":
                    image.src = "images/mist.jifif";
                    break;
                default:
                    image.src = "images/cloud.jpeg";
                    break;
            }

            temperature.innerHTML = `${Math.round(json.main.temp)}°C`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${json.wind.speed} km/h`;

            container.style.height = "600px";
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
        });
});
