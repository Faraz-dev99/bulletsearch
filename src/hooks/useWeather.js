import { useState, useEffect } from "react";
import { WEATHERAPI_KEY } from "../config";

const weatherIcons = {
  "01d": "https://openweathermap.org/img/wn/01d@2x.png",
  "01n": "https://openweathermap.org/img/wn/01n@2x.png",
  "02d": "https://openweathermap.org/img/wn/02d@2x.png",
  "02n": "https://openweathermap.org/img/wn/02n@2x.png",
  "03d": "https://openweathermap.org/img/wn/03d@2x.png",
  "03n": "https://openweathermap.org/img/wn/03n@2x.png",
  "04d": "https://openweathermap.org/img/wn/04d@2x.png",
  "04n": "https://openweathermap.org/img/wn/04n@2x.png",
  "09d": "https://openweathermap.org/img/wn/09d@2x.png",
  "09n": "https://openweathermap.org/img/wn/09n@2x.png",
  "10d": "https://openweathermap.org/img/wn/10d@2x.png",
  "10n": "https://openweathermap.org/img/wn/10n@2x.png",
  "11d": "https://openweathermap.org/img/wn/11d@2x.png",
  "11n": "https://openweathermap.org/img/wn/11n@2x.png",
  "13d": "https://openweathermap.org/img/wn/13d@2x.png",
  "13n": "https://openweathermap.org/img/wn/13n@2x.png",
  "50d": "https://openweathermap.org/img/wn/50d@2x.png",
  "50n": "https://openweathermap.org/img/wn/50n@2x.png",
};

export default function useWeather(defaultCity = "jaipur") {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchWeather = async (city) => {
    if (!city) {
      setLoading(false);
      return null;
    }
    try {
      setLoading("Refreshing..");
      setError(null);

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHERAPI_KEY}`
      );

      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      const localTime = new Date((data.dt + data.timezone) * 1000);
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      let formattedDate = localTime.toLocaleString('en-US', options);
      formattedDate = formattedDate.replace(/,\s*/g, ',')
      console.log(formattedDate);
      // "Saturday, August 9, 2025, 5:11:23 PM" (example)


      console.log(data)
      const formattedData = {
        city: data.name,
        country: data.sys.country,
        date: formattedDate,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        feels_like: data.main.feels_like,
        visibility: data.visibility / 1000,
        pressure: data.main.pressure,
        temperature: Math.floor(data.main.temp),
        minTemp: Math.floor(data.main.temp_min),
        maxTemp: Math.floor(data.main.temp_max),
        weather: data.weather[0].main,
        icon: weatherIcons[data.weather[0].icon],
        sunrise: new Date(data.sys.sunrise * 1000)
          .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
        sunset: new Date(data.sys.sunset * 1000)
          .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
      };

      setWeatherData(formattedData);
      setLoading(false);

      return formattedData;
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  useEffect(() => {
    if (defaultCity) {
      searchWeather(defaultCity);
    } else {
      setLoading(false); // clear stuck loading for first-time users
    }
  }, [defaultCity]);

  return { weatherData, loading, error, searchWeather };
}
