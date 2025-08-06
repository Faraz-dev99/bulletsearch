import React, { useContext } from 'react'
import { ThemeContext } from '../../core/layout/Layout';

const PopupMenu = ({children, onClose}) => {
    const {toggleThemeMode,setToggleThemeMode}=useContext(ThemeContext);
    const handleBackdropClick=(e)=>{
        if(e.target===e.currentTarget){
            onClose?.();
        }
    }
    return (
        <div 
        onClick={handleBackdropClick}
        className={` fixed z-50 top-0 left-0 px-0.5 backdrop-blur-sm h-screen w-screen grid place-items-center ${toggleThemeMode=="dark"?"bg-gray-950/50":"bg-gray-300/50"}  `}
        >
            <div className={` w-full border-[0.1px] ${toggleThemeMode=="dark"?"border-gray-700/50":"border-gray-300/30"} max-w-[400px] ${toggleThemeMode=="dark"?"bg-gray-900 text-gray-200":"bg-gray-300 text-gray-900"}  p-6 rounded-xl shadow-lg `}>
                    {children}
            </div>
        </div>
    )
}

export default PopupMenu
