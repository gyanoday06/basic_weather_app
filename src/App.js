import React, { useState } from 'react';
import './App.css';

const apiKey = "4b5cc7ed38fc52834d5e657f6a20eb34";
const apiUrl = 'https://api.openweathermap.org/data/2.5/find';

async function getCityData(city) {
  try {
    const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
    if (response.ok) {
      const data = await response.json();
      return data.list;
    } else {
      console.error('Failed to fetch city data');
      return null;
    }
  } catch (error) {
    console.error('Error fetching city data:', error);
    return null;
  }
}

function App() {
  const [loc, setLoc] = useState('');
  const [citySuggestions, setCitySuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('c');

  const toggleUnit = () => {
    setUnit(unit === 'c' ? 'f' : 'c');
  };

  const temperatureUnit = unit === 'c' ? '°C' : '°F';

  const temp = weatherData ? (unit === 'c' ? weatherData.main.temp : (weatherData.main.temp * 9 / 5 + 32)) : null;

  const fetchCitySuggestions = async () => {
    if (loc.trim() !== '') {
      const data = await getCityData(loc);
      if (data) {
        setCitySuggestions(data);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData();
    }
  };

  const handleSuggestionClick = (city) => {
    setLoc(city.name);
    setWeatherData(city);
    setCitySuggestions([]);
  };

  const fetchWeatherData = async () => {
    if (loc.trim() !== '') {
      const data = await getCityData(loc);
      if (data && data.length > 0) {
        setWeatherData(data[0]);
        setCitySuggestions([]);
      }
    }
  };

  const renderCitySuggestions = () => {
    return (
      <div className='suggestion-con'>
        <ul className="suggestion-list">
          {citySuggestions.map((city) => (
            <li key={city.id} onClick={() => handleSuggestionClick(city)} className='suggestion-city my-1'>
              {city.name}, {city.sys.country}
            </li>
          ))}
        </ul>
      </div>
    );
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
              onChange={(e) => {
                setLoc(e.target.value);
                fetchCitySuggestions();
              }}
              onKeyDown={handleKeyPress}
            />
            <span className="icon is-small is-right">
              <i className="fas fa-search"></i>
            </span>
          </p>
          {citySuggestions.length > 0 && renderCitySuggestions()}
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
