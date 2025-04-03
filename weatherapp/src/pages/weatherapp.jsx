import React, { useState, useEffect } from "react";

function Weather({ city }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!city.trim()) return;
    
    const timer = setTimeout(() => {
      fetchWeatherData(city);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [city]);

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    
    try {
      // Access API key using import.meta.env for Vite projects
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(response.status === 404 
          ? "City not found" 
          : "Failed to fetch weather data");
      }
      
      const data = await response.json();
      
      setWeather({
        temp: data.main.temp,
        humidity: data.main.humidity,
        condition: data.weather[0].description,
        icon: data.weather[0].icon,
        city: data.name,
        country: data.sys.country
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading weather data...</p>}
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      {weather && !loading && (
        <div>
          <h2>{weather.city}, {weather.country}</h2>
          <div>
            {weather.icon && (
              <img 
                src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
                alt={weather.condition}
              />
            )}
            <p>{weather.condition}</p>
          </div>
          <p>Temperature: {Math.round(weather.temp)}°C</p>
          <p>Humidity: {weather.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default Weather;