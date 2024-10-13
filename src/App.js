import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [search, setSearch] = useState("chennai");
  const [city, setCity] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeatherData = async () => {
    setLoading(true);
    setError(null); // Reset error before new request
    try {
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=7db7f4dc24f41ff2956b0ddce4ddf5da&units=metric`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      let result = await response.json();
      setCity(result);
    } catch (err) {
      setError(err.message);
      setCity(null);
    } finally {
      setLoading(false);
    }
  };

  // Debounce effect for delaying the API call
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (search) {
        getWeatherData();
      }
    }, 500); // Delay the API call by 500ms

    return () => clearTimeout(debounceTimer); // Cleanup timer
  }, [search]);

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">weatherify</h1>
        <div className="search-bar">
          <input
            type="search"
            placeholder="enter city name"
            spellCheck="false"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : city ? (
          <>
            <div className="temperature">
              <h2>{city.main?.temp}°C</h2>
              <h3>{city.name}</h3>
            </div>
            <div className="weather-cards">
              <div className="card">
                <h4>{city.rain?.['1h'] || 0}mm</h4>
                <p>rainfall</p>
              </div>
              <div className="card">
                <h4>{city.main?.humidity}%</h4>
                <p>humidity</p>
              </div>
              <div className="card">
                <h4>{city.main?.pressure}mb</h4>
                <p>pressure</p>
              </div>
              <div className="card">
                <h4>{city.wind?.speed}km/h</h4>
                <p>wind speed</p>
              </div>
              <div className="card">
                <h4>{city.wind?.deg}°</h4>
                <p>wind degree</p>
              </div>
              <div className="card">
                <h4>{city.main?.feels_like}°C</h4>
                <p>feels like</p>
              </div>
            </div>
          </>
        ) : (
          <p>No city found</p>
        )}
      </div>
      <footer className="footer">
        <p>© 2024 Weatherify. All rights reserved.</p>
        <p>Developed by Karthikeyan</p>
      </footer>
    </div>
    
  );
}

export default App;
