const userForm = document.querySelector(".request-form");
const searchBar = document.getElementById("searchBar");
const btnSubmit = document.getElementById("submitBtn");
const locationCity = document.querySelector(".location");
const todayDate = document.querySelector(".today-date");
const todayWeather = document.querySelector(".today-weather");
const weatherIllustration = document.querySelector(".weather-img");
const todayTemp = document.querySelector(".today-temperature");
const windSpeed = document.querySelector(".wind-speed");
const rainChance = document.querySelector(".rain-chance");

const defaultCity = "London";
let weatherData = {};

fetchWeather(defaultCity);

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const cityRequest = searchBar.value.trim();

  if (!cityRequest) {
    console.log("Enter a city please");
    return;
  }
  await fetchWeather(cityRequest);
});

async function fetchWeather(city) {
  try {
    const res = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key={PUT YOUR API KEY HERE}&unitGroup=metric`
    );
    weatherData = res.data;
    console.log(weatherData);

    updateUI();
  } catch (err) {
    console.error("Couldn't load weather data", err);
  }
}

// ==========================
// card info display
// ==================
const updateUI = () => {
  // date formater
  let dateToFormat = weatherData.days[0].datetime;
  const dateObj = new Date(dateToFormat);
  // --

  locationCity.textContent = weatherData.resolvedAddress;
  todayDate.textContent = dateObj.toLocaleDateString("fr-FR");

  todayWeather.textContent = weatherData.currentConditions.conditions;
  todayTemp.textContent = `${weatherData.currentConditions.temp}°C`;
  windSpeed.textContent = `${weatherData.currentConditions.windspeed}kp/h`;
  rainChance.textContent = `${weatherData.currentConditions.precipprob}%`;

  updateWeatherImage(weatherData.currentConditions.icon);
};

function updateWeatherImage(icon) {
  let svgUrl;

  switch (icon) {
    case "clear-day":
      svgUrl = "./img/sun.svg";
      break;
    case "clear-night":
      svgUrl = "./img/clear-night.svg";
      break;
    case "partly-cloudy-day":
      svgUrl = "./img/cloudy.svg";
      break;
    case "cloudy":
      svgUrl = "./img/cloudy.svg";
      break;
    case "partly-cloudy-night":
      svgUrl = "./img/partly-cloudy-night.svg";
      break;
    case "rain":
      svgUrl = "./img/rain.svg";
      break;
    case "snow":
      svgUrl = "./img/snowflake.svg";
      break;
    case "thunderstorm":
      svgUrl = "./img/thunderstorm.svg";
      break;
    case "fog":
      svgUrl = "./img/fog.svg";
      break;
    case "wind":
      svgUrl = "./img/wind.svg";
      break;
    default:
      svgUrl = "./img/default.svg";
  }

  fetch(svgUrl)
    .then((response) => response.text())
    .then((svgContent) => {
      weatherIllustration.innerHTML = svgContent;
      const svg = weatherIllustration.querySelector("svg");
    })
    .catch(() => {
      weatherIllustration.innerHTML = "";
    });
}
