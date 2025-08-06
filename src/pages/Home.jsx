import React, { useContext, useEffect, useState } from 'react';
import WebSearchForm from '../components/common/WebSearchForm/WebSearchForm';
import { IoMdSettings } from "react-icons/io";
import { CiLight, CiDark } from "react-icons/ci";
import { ThemeContext } from "../components/core/layout/Layout.jsx";
import QuickLinks from '../components/core/quicklinks/QuickLinks.jsx';
import PopupMenu from '../components/common/popups/PopupMenu.jsx';
import HomePageSettingsBox from '../components/common/popups/HomePageSettingsBox.jsx';

const Home = () => {
  const { toggleThemeMode, setToggleThemeMode } = useContext(ThemeContext);
  const [showPopupMenu, setShowPopupMenu] = useState(false);

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
        <div />
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
