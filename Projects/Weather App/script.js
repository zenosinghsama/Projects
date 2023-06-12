

// API_KEY for maps api
let API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

/**
 * Retrieve weather data from openweathermap
 * HINT: Use fetch()
 * HINT: URL should look like this: 
 * https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial
 */
const getWeatherData = (city) => {
  const URL = "https://api.openweathermap.org/data/2.5/weather";
  const FULL_URL = `${URL}?q=${city}&appid=${API_KEY}&units=imperial`;
  const weatherPromise  = fetch(FULL_URL);
  return weatherPromise.then((response) => {
    return response.json();
  })
}

/**
 * Retrieve city input and get the weather data
 * HINT: Use the promise returned from getWeatherData()
 */
const searchCity = () => {
  const city = document.getElementById('city-input').value;
  // CODE GOES HERE
  getWeatherData(city).then((res) => {
    showWeatherData(res);
  }) .catch ((error) => {
    console.log(error);
    console.log("Something Happened");
  })
}

/**
 * Show the weather data in HTML
 */
 showWeatherData = (weatherData) => {

  document.getElementById("city-name").innerText = weatherData.name;
  document.getElementById("weather-type").innerText = weatherData.weather[0].main;
  document.getElementById("temp").innerText = `${weatherData.main.temp.toFixed(1)} °F / ${((weatherData.main.temp - 32) * 5/9).toFixed(1)} °C`;
  document.getElementById("min-temp").innerText = `${weatherData.main.temp_min.toFixed(1)} °F / ${((weatherData.main.temp_min - 32) * 5/9).toFixed(1)} °C`;
  document.getElementById("max-temp").innerText = `${weatherData.main.temp_max.toFixed(1)} °F / ${((weatherData.main.temp_max - 32) * 5/9).toFixed(1)} °C`;
  document.getElementById("feels-like").innerText =`${weatherData.main.feels_like.toFixed(1)} °F / ${((weatherData.main.feels_like - 32) * 5/9).toFixed(1)} °C`;
}

