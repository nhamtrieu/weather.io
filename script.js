let apiKey = "96d6e535d11c0609450d4acdbd770ce4";
const main = document.querySelector(".main");
main.style.display = "none";
const fetchWeatherData = function (city) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    )
        .then((response) => response.json())
        .then((data) => this.renderWeather(data));
};
const renderWeather = function (data) {
    if (data.cod == "404") {
        main.style.display = "none";
        document.querySelector(".image").style.display = "flex";
    } else {
        document.querySelector(".image").style.display = "none";
        main.style.display = "block";
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        document.querySelector(".city").innerText = `Weather in ${name}`;
        document.querySelector(
            ".icon"
        ).src = ` http://openweathermap.org/img/wn/${icon}.png`;
        document.querySelector(".temp").innerText = `${(temp - 273.15).toFixed(
            2
        )}⁰C`;
        document.querySelector(".description").innerText = description;

        document.querySelector(".humidity").innerText = `Humidity: ${humidity}`;
        document.querySelector(".wind").innerText = `Wind speed: ${speed} km/h`;
    }
};
(function () {
    let inputLocation = document.querySelector("input");
    let searchBtn = document.querySelector("button");
    searchBtn.addEventListener("click", () => {
        let input = inputLocation.value;
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`;
        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                renderWeather(data);
            })
            .catch(() => {});
    });
    window.addEventListener("keyup", (e) => {
        if (e.keyCode === 13) {
            let input = inputLocation.value;
            if (input.trim() !== "") {
                let api = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`;
                fetch(api)
                    .then((response) => response.json())
                    .then((data) => {
                        main.style.display = "block";
                        renderWeather(data);
                    })
                    .catch(() => {});
            }
        }
    });
})();
