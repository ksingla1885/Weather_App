const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key




function getWeather() {
  const cityInput = document.getElementById("cityInput");
  const resultBox = document.getElementById("weatherResult");
  const city = cityInput.value.trim();

  if (!city) {
    resultBox.innerHTML = `<p style="color: red;">⚠️ Please enter a city name.</p>`;
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  // Show loading state
  resultBox.innerHTML = `⏳ Fetching weather for <b>${city}</b>...`;

  fetch(url)
    .then(async response => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch weather");
      }
      return data;
    })
    .then(data => {
      const weatherInfo = `
        <h2>📍 ${data.name}, ${data.sys.country}</h2>
        <p><strong>🌡 Temperature:</strong> ${data.main.temp} °C</p>
        <p><strong>🌤 Weather:</strong> ${data.weather[0].main}</p>
        <p><strong>💧 Humidity:</strong> ${data.main.humidity}%</p>
        <p><strong>🌬 Wind:</strong> ${data.wind.speed} m/s</p>
      `;
      resultBox.innerHTML = weatherInfo;
    })
    .catch(error => {
      console.error("Error fetching weather:", error);
      resultBox.innerHTML = `<p style="color: red;">❌ ${error.message}</p>`;
    });
}
