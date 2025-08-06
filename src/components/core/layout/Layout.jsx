import React, { createContext,useEffect, useState } from 'react'
import Home from '../../../pages/Home'
import { Outlet } from 'react-router'

export const ThemeContext=React.createContext({
  toggleThemeMode: "dark",
  setToggleThemeMode: () => {},
});
const Layout = () => {
    
    const [toggleThemeMode,setToggleThemeMode]=useState("dark");
    const [themeLoaded, setThemeLoaded] = useState(false);

    const ThemeModeColor={
       "darkThemeColor":" bg-gray-950 text-gray-100",
       "lightThemeColor":" bg-gray-100 text-gray-950"
    }

    useEffect(() => {
    const stored = localStorage.getItem("bulletSearchThemeMode");
    if (stored) {
        try {
            setToggleThemeMode(JSON.parse(stored));
        } catch (err) {
            console.error("Error parsing theme from localStorage", err);
        }
    }
    setThemeLoaded(true);
}, []);

useEffect(() => {
    if (themeLoaded) {
        localStorage.setItem("bulletSearchThemeMode", JSON.stringify(toggleThemeMode));
    }
}, [toggleThemeMode, themeLoaded]);

  return (
    <ThemeContext.Provider value={{toggleThemeMode,setToggleThemeMode}}>
    {/* <div className={` dark px-2 min-h-screen ${toggleThemeMode=="dark"?ThemeModeColor['darkThemeColor']:ThemeModeColor['lightThemeColor']} `}> */}
    <div className={` ${toggleThemeMode=="dark"?"dark":""} bg-gray-100 dark:bg-gray-950 text-gray-950 dark:text-gray-100 min-h-screen  `}>
            <Outlet />
    </div>
    </ThemeContext.Provider>
  )
}

export default Layout
