import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../core/layout/Layout';
import { BsLayers } from "react-icons/bs";

const QuickLInkForm = ({ onClose, onAddLink }) => {
    const { toggleThemeMode, setToggleThemeMode } = useContext(ThemeContext);
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose?.();
        }
    }
    const handleAddLink = (e) => {
        e.preventDefault();
        if (link == "") return;
        console.log(link)
        onAddLink?.(title, link);

    }
    return (
        <div>
            <div className=' flex items-center gap-3 mb-8'>
                <div className={` text-orange-500 text-2xl p-2 rounded-lg ${toggleThemeMode=="dark"?"bg-orange-500/20":"bg-orange-300/30"}`}><BsLayers /></div>
                <h1 className='  py-2 text-xl font-semibold'>Add Quick Link</h1>
            </div>

            <form className=' flex flex-col gap-4' onSubmit={handleAddLink}>
                <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title (Optional)' className={` ${toggleThemeMode == "dark" ? "bg-gray-700" : "bg-gray-200"}  rounded-md py-2 px-3 outline-none`} />
                <input type='text' value={link} onChange={(e) => setLink(e.target.value)} placeholder='https://www.google.com' className={` ${toggleThemeMode == "dark" ? "bg-gray-700" : "bg-gray-200"} rounded-md py-2 px-3 outline-none`} />
                <div className=' flex justify-between gap-2 mt-4'>
                    <button type='button' className={` dark:bg-gray-600 dark:hover:bg-gray-600/80 bg-gray-200 hover:bg-gray-100 py-2 px-3  rounded-md w-full cursor-pointer transition`} onClick={handleBackdropClick}>Cancel</button>
                    <button type='submit' className=' bg-orange-500 text-white dark:text-gray-950 hover:bg-orange-500/80 py-2 px-3 rounded-md w-full cursor-pointer transition' >Add Shortcut</button>
                </div>
            </form>
        </div>
    )
}

export default QuickLInkForm
