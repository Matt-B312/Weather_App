import React, { useState } from "react";

const api = {
  key: "dfee516c3916cb2ca97617e5fe56fbb2",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  
  const time = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let amPm = ( (hours < 12) ? "am" : "pm" );
    if ( hours === 0) {
      hours = "12" ;
    } else if ( hours > 12 ) {
      hours = (hours - 12);
    }

    return `${hours} : ${minutes} ${amPm}`
  }



  return (
    <div className={(typeof weather.weather != "undefined") ? 
        ((weather.weather[0].main === "Clear") ? 'app warm' :
         (weather.weather[0].main === "Thunderstorm") ? 'app thunderstorm' :  
         (weather.weather[0].main === "Snow") ? 'app snow' :
         (weather.weather[0].main === "Clouds") ? 'app clouds' :
         (weather.weather[0].main === "Rain") ? 'app rain' :
         (weather.weather[0].main === "Drizzle") ? 'app drizzle' : 'app') : 'app'}>
      <main>
        
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search City..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
            <div className="time">{time(new Date)}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;