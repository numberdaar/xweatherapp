import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file
import WeatherCard from './WeatherCard';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'b7cac01525aa4a0f955194837242803';

  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
        params: {
          key: API_KEY,
          q: city,
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      setError('Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Weather Application</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading data…</p>}
      {error && <p>{error}</p>}
      {weatherData && (
        <div className="weather-cards">
          <WeatherCard
            label="Temperature"
            value={`${weatherData.current.temp_c} °C`}
          />
          <WeatherCard
            label="Humidity"
            value={`${weatherData.current.humidity} %`}
          />
          <WeatherCard
            label="Condition"
            value={weatherData.current.condition.text}
          />
          <WeatherCard
            label="Wind Speed"
            value={`${weatherData.current.wind_kph} kph`}
          />
        </div>
      )}
    </div>
  );
}

export default App;
