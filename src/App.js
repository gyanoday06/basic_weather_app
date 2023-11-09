import React, { useState } from 'react';
import './App.css';

const apiKey = '4b5cc7ed38fc52834d5e657f6a20eb34';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

function App() {
  const [loc, setLoc] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('c');

  const toggleUnit = () => {
    setUnit(unit === 'c' ? 'f' : 'c');
  };

  const temperatureUnit = unit === 'c' ? '°C' : '°F';

  const temp = weatherData ? (unit === 'c' ? weatherData.main.temp : (weatherData.main.temp * 9/5 + 32)) : null;

  const fetchData = async () => {
    if (loc.trim() !== '') {
      try {
        const response = await fetch(`${apiUrl}?q=${loc}&appid=${apiKey}&units=metric`);
        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          console.error('Failed to fetch weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <div className="main">
      <div className="card p-5 pt-4">
        <div className="input--field">
          <p className="control has-icons-right">
            <input
              className="input is-rounded"
              type="text"
              placeholder="Search"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <span className="icon is-small is-right">
              <i className="fas fa-search"></i>
            </span>
          </p>
        </div>
        <div className="main--content mt-4">
          <i className="fas fa-cloud cloud--i"></i>
          {weatherData && (
            <div>
              <p className="temp--num my-2">
                {temp ? Math.round(temp) : ''} {temperatureUnit}
              </p>
              <p className="fs-4">{weatherData.name}</p>
            </div>
          )}
        </div>
        <div className="form-check form-switch mt-4 d-flex unit--sel me-5">
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            in °C
          </label>
          <input
            className="form-check-input mx-2"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            style={{ backgroundColor: "wheat" }}
            checked={unit === 'f'}
            onChange={toggleUnit}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            in °F
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
