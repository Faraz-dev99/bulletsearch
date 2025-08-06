import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../core/layout/Layout';
import { MdEdit } from "react-icons/md";

const EditQuickLinkForm = ({ onClose, onEditLink, id, title, link }) => {
    const { toggleThemeMode, setToggleThemeMode } = useContext(ThemeContext);
    const [edittitle, setEditTitle] = useState("");
    const [editlink, setEditLink] = useState("");

    useEffect(() => {
        setEditTitle(title)
        setEditLink(link)
    }, [])

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose?.();
        }
    }

    const handleEditLink = (e) => {
        e.preventDefault();
        if (editlink == "") return;
        onEditLink?.(id, edittitle, editlink);

    }
    return (
        <div>
            <div>
                <div className=' flex items-center gap-3 mb-8'>
                    <div className={` text-orange-500 text-2xl p-2 rounded-lg ${toggleThemeMode == "dark" ? "bg-orange-500/20" : "bg-orange-300/30"}`}><MdEdit /></div>
                    <h1 className=' py-2 text-xl font-semibold'>Edit Quick Link</h1>
                </div>

                <form className=' flex flex-col gap-4' onSubmit={handleEditLink}>
                    <input type='text' value={edittitle} onChange={(e) => setEditTitle(e.target.value)} placeholder='Title (Optional)' className={` ${toggleThemeMode == "dark" ? "bg-gray-600" : "bg-gray-200"} rounded-md py-2 px-3 outline-none`} />
                    <input type='text' value={editlink} onChange={(e) => setEditLink(e.target.value)} placeholder='https://www.google.com' className={`  ${toggleThemeMode == "dark" ? "bg-gray-600" : "bg-gray-200"} rounded-md py-2 px-3 outline-none`} />
                    <div className=' flex justify-between gap-2 mt-4'>
                        <button type='button' className={` dark:bg-gray-600 dark:hover:bg-gray-600/80 bg-gray-200 hover:bg-gray-100 py-2 px-3 rounded-md w-full cursor-pointer transition`} onClick={handleBackdropClick}>Cancel</button>
                        <button type='submit' className=' bg-orange-500 text-white dark:text-gray-950 hover:bg-orange-500/80 py-2 px-3 rounded-md w-full cursor-pointer transition' >Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditQuickLinkForm
