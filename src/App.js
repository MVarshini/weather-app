
import React, { useState } from 'react';
import moment from 'moment'
import './App.css';
const api = {
  key: "858f15fed9292cbe25c341a754c55e45",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState({});
  const search = () => {
    console.log('hello');
    getData(location);
  }
  const getData = async (location) => {
    let url = `${api.base}weather?q=${location}&APPID=${api.key}`
    try {
        const response = await fetch(url);
        const json = await response.json();
        setWeather(json);
      } catch (error) {
        console.log("error", error);
    }
};
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp - 273.15 > 19) ? 'app warm' : 'app') : 'app'}>        
    {/* </div><div className="app"> */}
      <div className="search-container">
        <input 
            type="text"
            className="search-input"
            placeholder="Enter the location"
            onChange={e => setLocation(e.target.value)}
            value={location}
          />
          <button className="search-button" onClick={search}>Search</button>
      </div>
      {
        (Object.keys(weather).length > 0 && weather.constructor === Object ) && 
        <div className="wrapper">
          <div className="location-container">
            <div className="location">{weather?.main?.name}</div>
            <div className="date">{moment(new Date()).format('MMM Do, YYYY')}</div>
          </div>
          <div className="weather-container">
            <div className="temp">
              {`${Math.floor(weather?.main?.temp - 273.15)}° C`}
            </div>
            <div className="weather">{weather?.weather?.[0].main}</div>
          </div>
        </div>
      }                 
    </div>
  );
}

export default App;
