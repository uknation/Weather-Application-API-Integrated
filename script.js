const form = document.getElementById('search-form');
const cityInput = document.getElementById('city');
const container = document.getElementById('weather-container');

const locationName = document.getElementById('location');
const description = document.getElementById('description');
const temperature = document.getElementById('temperature');
const feelsLike = document.getElementById('feels-like');
const icon = document.getElementById('icon');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const pressure = document.getElementById('pressure');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${city}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '053b4d1b8cmsh76ee64c17fcf9eep1cdc55jsnc7856c907593',
      'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // Update DOM (adapt fields based on API response structure)
    locationName.textContent = data.city;
    description.textContent = data.weather.description || "N/A";
    temperature.textContent = `${data.weather.temp}°C`;
    feelsLike.textContent = `Feels like: ${data.weather.feels_like}°C`;
    icon.src = `https://openweathermap.org/img/wn/${data.weather.icon || "01d"}@2x.png`;
    icon.alt = data.weather.description || "";

    humidity.textContent = `${data.weather.humidity}%`;
    wind.textContent = `${data.weather.wind_speed} m/s`;
    pressure.textContent = `${data.weather.pressure} hPa`;

    container.classList.remove('d-none');
  } catch (error) {
    alert("Weather data not found.");
    container.classList.add('d-none');
    console.error(error);
  }
});
