import './App.css';
import search_icon from "./Essentials/search.png"
import clear_icon from "./Essentials/clear.png"
import cloud_icon from "./Essentials/cloud.png"
import drizzle_icon from "./Essentials/drizzle.png"
import rain_icon from "./Essentials/rain.png"
import snow_icon from "./Essentials/snow.png"

import { useState } from 'react';

function App() {
  const apikey = "edba0102294da0af10aefbb4a4917189";
  const [temperature, setTemperature] = useState("50 F");
  const [location, setLocation] = useState("New York");
  const [searchItem, setSearchItem] = useState("");
  const [weatherPicture, setWeatherPicture] = useState(cloud_icon);

  const search = async () => {
    if (searchItem.trim() === "") {
      return 0;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchItem}&appid=${apikey}&units=imperial`;

    try {
      const res = await fetch(url);
      const datasec = await res.json();
      setLocation(datasec.name)
      setTemperature(Math.floor(datasec.main.temp) + " F")

      switch (datasec.weather[0].icon) {
        case "01d":
        case "01n":
          setWeatherPicture(clear_icon);
          break;
        case "02d":
        case "02n":
          setWeatherPicture(cloud_icon);
          break;
        case "03d":
        case "03n":
        case "04d":
        case "04n":
          setWeatherPicture(drizzle_icon);
          break;
        case "09d":
        case "09n":
        case "10d":
        case "10n":
        case "11d":
        case "11n":
          setWeatherPicture(rain_icon);
          break;
        case "13d":
        case "13n":
          setWeatherPicture(snow_icon);
          break;
        default:
          setWeatherPicture(cloud_icon);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="bodyApp">
      <div className="topHeader">
        <header>
          <h1>Weather Helper</h1>
          <input type="text" className="textWeather" id="weather123"
          placeholder="Enter City name" required value={searchItem} onChange={e => setSearchItem(e.target.value) }/>

          <button className="submitCity" onClick={search}> Submit </button>   

        </header>
      </div>

      {/* This is for the bottom section for Weather information */}
      <div className="bottomHeader">
        <div className="WeatherInfo">
          {/* This is where the weather information goes */}
          <h2 className="info">Weather Information</h2>
          <div className='weather-image '>
            <img src={weatherPicture} alt="" />
          </div>
          <div className="weather-temp flex justify-center text-white text-[70px] font normal ">{temperature}</div>
          <div className="weather-location flex justify-center text-white text-[40px] font normal">{location}</div>
        </div>
      </div>
    </div>   

  );
}

export default App;
