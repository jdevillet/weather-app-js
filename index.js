// todo
// - Recherche météo par ville
// - Affichage température, humidité, vent
// - Changement automatique d'icône selon météo
// - Historique des recherches (localStorage)
// - Dark mode avec sauvegarde

const searchBar = document.getElementById("searchBar");
const btnSubmit = document.getElementById("submitBtn");
const locationCity = document.querySelector(".location");
const todayDate = document.querySelector(".today-date");
const todayWeather = document.querySelector(".today-weather");
const weatherIllustration = document.querySelector(".weather-img");
const todayTemp = document.querySelector(".today-temperature");
const windSpeed = document.querySelector(".wind-speed");
const rainChance = document.querySelector(".rain-chance");
