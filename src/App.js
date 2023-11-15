// import React, { useState, useEffect } from 'react';
// import './App.css';

// import cityData from './data.json';

// const apiKey = process.env.REACT_APP_API_KEY;
// const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

// async function getCityData(query) {
//   try {
//     const response = await fetch(`${apiUrl}?q=${encodeURIComponent(query)}&appid=${apiKey}&units=metric`);
//     if (response.ok) {
//       const data = await response.json();
//       console.log('API Response:', data);
//       return data;
//     } else if (response.status === 404) {
//       console.error('City not found.');
//       return null;
//     } else {
//       const errorMessage = await response.text();
//       console.error('Failed to fetch city data. Error:', errorMessage);
//       return null;
//     }
//   } catch (error) {
//     console.error('Error fetching city data:', error);
//     return null;
//   }
// }

// function App() {
//   const [loc, setLoc] = useState('');
//   const [citySuggestions, setCitySuggestions] = useState([]);
//   const [weatherData, setWeatherData] = useState(null);
//   const [unit, setUnit] = useState('c');
//   const [showSuggestions, setShowSuggestions] = useState(true);

//   useEffect(() => {
//     const fetchCitySuggestions = async () => {
//       if (loc.trim() !== '') {
//         const data = await getCityData(loc);
//         if (data) {
//           setCitySuggestions([data]);
//         }
//       }
//     };

//     fetchCitySuggestions();
//   }, [loc]);

//   const toggleUnit = () => {
//     setUnit((prevUnit) => (prevUnit === 'c' ? 'f' : 'c'));
//   };

//   const temperatureUnit = unit === 'c' ? '°C' : '°F';

//   const temp = weatherData ? (unit === 'c' ? weatherData.main.temp : weatherData.main.temp * 1.8 + 32) : null;

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       fetchWeatherData();
//     }
//   };

//   const handleSuggestionClick = async (selectedCityName) => {
//     setLoc(selectedCityName);
//     setShowSuggestions(false);

//     const data = await getCityData(selectedCityName);
//     if (data) {
//       setWeatherData(data);
//       setCitySuggestions([]);
//     }
//   };

//   const renderCitySuggestions = () => {
//     if (!showSuggestions) {
//       return null;
//     }

//     return (
//       <div className="suggestion-con">
//         <select className="suggestion-list" size="5" onChange={(e) => handleSuggestionClick(e.target.value)}>
//           {citySuggestions.map((city) => (
//             <option key={city.id} value={city.name} className='suggestion-city'>
//               {city.name}, {city.sys.country}
//             </option>
//           ))}
//         </select>
//       </div>
//     );
//   };

//   const fetchWeatherData = async () => {
//     if (loc.trim() !== '') {
//       const data = await getCityData(loc);
//       if (data) {
//         setWeatherData(data);
//         setCitySuggestions([]);
//       }
//     }
//   };

//   return (
//     <div className="main">
//       <div className="card p-5 pt-4">
//         <div className="input--field">
//           <p className="control has-icons-right">
//             <input
//               className="input is-rounded"
//               type="text"
//               placeholder="Search"
//               value={loc}
//               onChange={(e) => {
//                 setLoc(e.target.value);
//                 setShowSuggestions(true);
//               }}
//               onKeyDown={handleKeyPress}
//             />
//             <span className="icon is-small is-right">
//               <i className="fas fa-search"></i>
//             </span>
//           </p>
//           {/* {renderCitySuggestions()} */}
//         </div>
//         <div className="main--content mt-4">
//           <i className="fas fa-cloud cloud--i"></i>
//           {weatherData && (
//             <div>
//               <p className="temp--num my-2">
//                 {temp ? Math.round(temp) : ''} {temperatureUnit}
//               </p>
//               <p className="fs-4">{weatherData.name}</p>
//             </div>
//           )}
//         </div>
//         <div className="form-check form-switch mt-4 d-flex unit--sel me-5">
//           <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
//             in °C
//           </label>
//           <input
//             className="form-check-input mx-2"
//             type="checkbox"
//             role="switch"
//             id="flexSwitchCheckDefault"
//             style={{ backgroundColor: 'wheat' }}
//             checked={unit === 'f'}
//             onChange={toggleUnit}
//           />
//           <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
//             in °F
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import './App.css';

const apiKey = process.env.REACT_APP_API_KEY;
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function getCityData(query) {
  try {
    const response = await fetch(`${apiUrl}?q=${encodeURIComponent(query)}&appid=${apiKey}&units=metric`);
    if (response.ok) {
      const data = await response.json();
      console.log('API Response:', data);
      return data;
    } else if (response.status === 404) {
      console.error('City not found.');
      return null;
    } else {
      const errorMessage = await response.text();
      console.error('Failed to fetch city data. Error:', errorMessage);
      return null;
    }
  } catch (error) {
    console.error('Error fetching city data:', error);
    return null;
  }
}

function App() {
  const [loc, setLoc] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState('c');

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'c' ? 'f' : 'c'));
  };

  const temperatureUnit = unit === 'c' ? '°C' : '°F';

  const temp = weatherData ? (unit === 'c' ? weatherData.main.temp : weatherData.main.temp * 1.8 + 32) : null;

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData();
    }
  };

  const fetchWeatherData = async () => {
    if (loc.trim() !== '') {
      const data = await getCityData(loc);
      if (data) {
        setWeatherData(data);
      }
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
              onKeyDown={handleKeyPress}
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
            style={{ backgroundColor: 'wheat' }}
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
