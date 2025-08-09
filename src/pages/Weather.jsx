import { useState } from "react";
import useWeather from "../hooks/useWeather";
import { FaArrowDown, FaArrowUp, FaLocationDot, FaTemperatureFull, FaWind } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import WeatherSearchForm from "../components/common/WeatherSearchForm/WeatherSearchForm";
import PopupMenu from "../components/common/popups/PopupMenu";
import WeatherManage from "../components/common/popups/WeatherManage";
import { WiHumidity } from "react-icons/wi";
import WeatherDetail from "../components/common/WeatherDetail/WeatherDetail";
import { MdOutlineVisibility } from "react-icons/md";
import { RiSpeedUpLine } from "react-icons/ri";
import { BsFillSunriseFill,BsFillSunsetFill } from "react-icons/bs";
import { useNavigate } from "react-router";

export default function Weather() {
  const navigate=useNavigate();
  const [currentCity, setCurrentCity] = useState(() => {
    const saved = localStorage.getItem("currentCity");
    return saved ? JSON.parse(saved) : null;
  });
  const [changeCity, setChangeCity] = useState(false);
  const { weatherData, loading, error, searchWeather } = useWeather(currentCity);
  const [cities, setCities] = useState(() => {
    const saved = localStorage.getItem("cities");
    return saved ? JSON.parse(saved) : [];
  });

  const weatherDetails = weatherData ? [
    {
    icon: <FaTemperatureFull />,
    iconColor:" text-red-500",
    name: "Feels Like",
    data: weatherData.feels_like,
    dataSymbol: "°C"
  },
  {
    icon: <WiHumidity />,
    iconColor:"text-sky-500",
    name: "Humidity",
    data: weatherData.humidity,
    dataSymbol: "%"
  },
  {
    icon: <FaWind />,
    iconColor:"text-sky-400",
    name: "Wind Speed",
    data: weatherData.windSpeed,
    dataSymbol: " km/h"
  },
  {
    icon: <MdOutlineVisibility />,
    iconColor:"text-purple-500",
    name: "visibility",
    data: weatherData.visibility,
    dataSymbol: " km"
  },
  {
    icon: <RiSpeedUpLine />,
    iconColor:"text-yellow-500",
    name: "Air Pressure",
    data: weatherData.pressure,
    dataSymbol: " hPa"
  },
  {
    icon: <FaArrowDown />,
    iconColor:"text-blue-500",
    name: "Min Temp",
    data: weatherData.minTemp,
    dataSymbol: "°C"
  },
  {
    icon: <FaArrowUp />,
    iconColor:"text-red-500",
    name: "Max Temp",
    data: weatherData.maxTemp,
    dataSymbol: "°C"
  },
  {
    icon: <BsFillSunriseFill />,
    iconColor:"text-yellow-400",
    name: "Sunrise",
    data: weatherData.sunrise,
    dataSymbol: ""
  },
  {
    icon: <BsFillSunsetFill />,
    iconColor:"text-indigo-900",
    name: "Sunset",
    data: weatherData.sunset,
    dataSymbol: ""
  },
] : [];

  if (loading) {
    return <div className=" grid place-items-center min-h-full font-bold text-xl" style={{ minHeight: '100dvh' }}>
      {loading}
    </div>
  }


  if (error || !currentCity) {
    return <div className=" flex flex-col gap-2 font-bold  justify-center items-center" style={{ minHeight: '100dvh' }}>
      <p className=" text-xl">{error ? error : "no city found"}</p>
      <button className=" rounded-3xl cursor-pointer bg-orange-500 text-white dark:text-gray-950 px-4 py-2" onClick={() => setChangeCity(true)}>add city</button>
      {
        (changeCity) && <PopupMenu onClose={() => setChangeCity(false)}>
          <WeatherManage
            onClose={() => setChangeCity(false)}
            searchWeather={searchWeather}
            currentCity={currentCity}
            setCurrentCity={setCurrentCity}
            cities={cities}
            setCities={setCities}
          />
        </PopupMenu>
      }
    </div>
  }

  return (
    <div className="p-4">
      {
        (changeCity) && <PopupMenu onClose={() => setChangeCity(false)}>
          <WeatherManage
            onClose={() => setChangeCity(false)}
            searchWeather={searchWeather}
            currentCity={currentCity}
            setCurrentCity={setCurrentCity}
            cities={cities}
            setCities={setCities}
          />
        </PopupMenu>
      }

      {weatherData && !loading && (
        <div className="  md:mx-16">
          <button className=" cursor-pointer text-orange-500 my-5" onClick={()=>navigate('/')}>←Back to Home</button>
          <div className=" flex max-md:flex-col gap-4 justify-between items-center my-10">

            <div className=" flex max-md:flex-col items-center gap-2">
              <div className=" flex gap-2 items-center text-xl md:text-2xl">
                <div className=" text-orange-500"><FaLocationDot /></div>
                <div className=" font-bold">{weatherData.city}, {weatherData.country}</div>
              </div>
              <button className=" rounded-3xl cursor-pointer bg-orange-500 text-white dark:text-gray-950 px-4 py-2" onClick={() => setChangeCity(true)}>change city</button>
            </div>

            <div>
              <div className=" flex flex-wrap items-center">
                <img src={weatherData.icon} className=' max-h-[200px]' />
                <h1 className=" text-7xl font-extrabold flex gap-2">{weatherData.temperature}<span className=" flex flex-col gap-2 text-xl font-bold"><p>°C</p><p>{weatherData.weather}</p></span></h1>
              </div>
              <p className=" font-normal text-xl text-gray-500 dark:text-gray-300 text-center">{weatherData.date}</p>
            </div>

          </div>

          <div className=" mt-28">
            <h1 className=" font-bold text-2xl text-gray-500 dark:text-gray-200 mb-2">Weather Details</h1>

            <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
              {
                weatherDetails.map((e, i) => {
                  return <WeatherDetail key={i} icon={e.icon} iconColor={e.iconColor} name={e.name} data={e.data} dataSymbol={e.dataSymbol} />
                })
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
