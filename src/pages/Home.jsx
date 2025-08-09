import React, { useContext, useEffect, useState } from 'react';
import WebSearchForm from '../components/common/WebSearchForm/WebSearchForm';
import { IoMdSettings } from "react-icons/io";
import { CiLight, CiDark } from "react-icons/ci";
import { ThemeContext } from "../components/core/layout/Layout.jsx";
import QuickLinks from '../components/core/quicklinks/QuickLinks.jsx';
import PopupMenu from '../components/common/popups/PopupMenu.jsx';
import HomePageSettingsBox from '../components/common/popups/HomePageSettingsBox.jsx';
import useWeather from '../hooks/useWeather.js';
import WeatherManage from '../components/common/popups/WeatherManage.jsx';
import { NavLink } from 'react-router';

const Home = () => {
  const { toggleThemeMode, setToggleThemeMode } = useContext(ThemeContext);
  const [showPopupMenu, setShowPopupMenu] = useState(false);
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

  const handleThemeMode = () => {
    setToggleThemeMode(prev => (toggleThemeMode === "dark" ? "light" : "dark"));
  };

  const [homepageSettings, setHomePageSettings] = useState([]);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  useEffect(() => {
    const defaultSettings = [
      { name: "Show Logo", status: true },
      { name: "Show Quick Links", status: true },
      { name: "Show Weather", status: true },
    ];
    const storedSettings = localStorage.getItem("bulletSearchHomepageSettings");
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings);
        const merged = defaultSettings.map(defaultItem => {
          const match = parsedSettings.find(item => item.name === defaultItem.name);
          return match ? match : defaultItem;
        });
        setHomePageSettings(merged);
      } catch (err) {
        console.error("Error parsing homepage settings", err);
        setHomePageSettings(defaultSettings);
      }
    } else {
      setHomePageSettings(defaultSettings);
    }
    setSettingsLoaded(true);
  }, []);

  useEffect(() => {
    if (settingsLoaded) {
      localStorage.setItem("bulletSearchHomepageSettings", JSON.stringify(homepageSettings));
    }
  }, [homepageSettings, settingsLoaded]);

  const getSettingStatus = (name) => {
    const found = homepageSettings.find(item => item.name === name);
    return found ? found.status : false;
  };


  return (
    <div className='min-h-screen flex flex-col' style={{ minHeight: '100dvh' }}>
      <header className='flex justify-between py-2 px-2'>
        <div>
          {getSettingStatus("Show Weather") && <div>
            {
              (error || !currentCity || !weatherData) ? <div className=" flex flex-col gap-2 font-bold  justify-center items-center">
                <button className=" rounded-3xl cursor-pointer bg-orange-500 text-sm text-white dark:text-gray-950 px-4 py-2" onClick={() => setChangeCity(true)}>add city</button>
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
              </div> : <NavLink to={'/weather'} className=' flex hover:dark:bg-gray-900 px-4 py-2 rounded-lg cursor-pointer flex-wrap justify-center gap-1 items-center font-medium'><p>{weatherData.city}</p><img src={weatherData.icon} className=' max-h-[40px]' /> <div className=' flex flex-col  text-sm justify-center items-center'><p className=' font-bold '>{weatherData.temperature}°C</p><p className=' text-xs text-gray-500'>{weatherData.weather}</p></div> </NavLink>
            }</div>}
        </div>
        
        <div className='flex gap-1 md:gap-4 text-xl'>
          <button onClick={handleThemeMode} className={` ${toggleThemeMode == "dark" ? "hover:bg-gray-700" : "hover:bg-gray-300"}  p-3 rounded-[6px] cursor-pointer `}>{toggleThemeMode == "dark" ? <CiLight /> : <CiDark />}</button>
          <button onClick={() => setShowPopupMenu(true)} className={` group  ${toggleThemeMode == "dark" ? "hover:bg-gray-700" : "hover:bg-gray-300"}  rounded-[6px] cursor-pointer p-3 `}><IoMdSettings className=' transition-all group-hover:rotate-90' /></button>
        </div>
      </header>

      <section className='flex-grow flex flex-col items-center justify-center gap-8 w-full py-4 px-4'>
        {getSettingStatus("Show Logo") && <h1 className='text-orange-500 font-bold max-md:text-4xl text-6xl'>BulletSearch</h1>}
        <WebSearchForm />
        {getSettingStatus("Show Quick Links") && (
          <div className='grid place-items-center mt-4 w-full'>
            <QuickLinks />
          </div>
        )}
      </section>

      {showPopupMenu && (
        <PopupMenu onClose={() => setShowPopupMenu(false)}>
          <HomePageSettingsBox
            onClose={() => setShowPopupMenu(false)}
            homePageSettings={homepageSettings}
            onChangeHomePageSettings={setHomePageSettings}
          />
        </PopupMenu>
      )}

      <footer className='text-center text-sm text-gray-400 mt-24 my-6'>
        <p>© 2025 BulletSearch. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
