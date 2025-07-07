import React from "react";
import "./App.css";
import { useState } from "react";
import axios from "axios";
// Spinner removed

function App() {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState({
    loading: false,
    data: {},
    error: false
  });

  const todate = () => {
    const months = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
    const currentDate = new Date();
    const date = ` ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
    return date;
  }

  const search = (event) => {
    if (event.key === "Enter") {
      setInput('');
      setWeather({ ...weather, loading: true });
      axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: input,
          units: 'metric',
          appid: "098ab9abbcc6e25597d2f42c69810087"
        }
      }).then(res => {
        console.log(res);
        setWeather({ data: res.data, loading: false, error: false });
      }).catch(err => {
        setWeather({ data: {}, loading: false, error: true });
      });
    }
  }

  return (
    <div className="App">
      <div className="weather-app">
        <div className="city-search">
          <input
            type="text"
            className="city"
            placeholder="Enter city name ..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={search}
          />
        </div>
        {
          weather.loading && (
            <div className="loading">Loading...</div> // fallback text instead of spinner
          )
        }
        {
          weather.error && (
            <div className="error">City not found</div>
          )
        }
        {
          weather && weather.data && weather.data.main && (
            <div>
              <div className="city-name">
                <h2>{weather.data.name},
                  <span>{weather.data.sys.country}</span>
                </h2>
              </div>
              <div className="date">
                <span>{todate()}</span>
              </div>
              <div className="icon-temp">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                  alt=""
                />
                {Math.round(weather.data.main.temp)}
                <sup className="deg">°C</sup>
              </div>
              <div className="des-wind">
                <p>{weather.data.weather[0].description.toUpperCase()}</p>
                <p>Wind speed: {weather.data.wind.speed}</p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
