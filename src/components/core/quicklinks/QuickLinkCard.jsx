import React, { useContext, useEffect, useState } from 'react'
import { GoKebabHorizontal } from "react-icons/go";
import { CiEdit } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { ThemeContext } from '../layout/Layout';

const QuickLinkCard = ({ id, title, link, icon, onEditForm, setCurrentEditLink, onDeleteLink }) => {
    const [linkCardOptions, setLinkCardOptions] = useState(false);
    const [showCardMenu, setShowCardMenu] = useState(false);
    const { toggleThemeMode, setToggleThemeMode } = useContext(ThemeContext);

if(!ThemeContext){ 
    alert("problem")
     return;}

    return (
        <div onMouseOver={() => setShowCardMenu(true)} onMouseLeave={() => {
            setShowCardMenu(false)
            setLinkCardOptions(false)
        }} className={` relative flex gap-3 transition-all duration-300 w-full md:justify-center items-center md:flex-col dark:bg-gray-900 dark:hover:bg-gray-800 bg-gray-300 hover:bg-gray-200  text-2xl rounded-md p-4 py-5 md:py-6 cursor-pointer`}>
            <a href={link} target='_blank' className=' max-md:min-w-[10%]'>
                <img src={icon}
                    className=' w-full max-w-[40px] h-full'
                    onError={() => {
                        console.warn("Icon failed to load:", icon);
                        setTimeout(() => {
                            onDeleteLink?.(id);
                        }, 2000);
                    }} />
            </a>
            <div className=' flex flex-col md:text-center gap-1 w-[90%] text-xs overflow-hidden'>
                <a href={link} target='_blank' className=' text-sm'>{title}</a>
                <a href={link} target='_blank' className=' md:hidden'>{link.replace(/(^\w+:|^)\/\//, "")}</a>

            </div>
            {showCardMenu && <div className=' absolute  top-1 md:top-2 right-1' onClick={() => setLinkCardOptions(true)}><GoKebabHorizontal className=' md:rotate-90' /></div>}
            {linkCardOptions && <div className=' z-50 border-[0.1px] dark:border-gray-700/50 border-gray-400/30 absolute top-8 right-4 text-lg flex flex-col w-full max-w-[200px] rounded-md bg-gray-300 dark:bg-gray-950 '>
                <button type='button' className=' flex w-full py-3 px-2 gap-2 border-b-[0.1px] dark:border-b-gray-700/50 border-b-gray-400/30  hover:bg-gray-900/30 items-center cursor-pointer' onClick={() => {
                    onEditForm?.()
                    setCurrentEditLink({ id, title, link, icon })
                }}><CiEdit /><div>Edit</div></button>
                <button type='button' className=' flex w-full py-3 px-2 gap-2 text-red-500 hover:bg-red-900/30 items-center cursor-pointer' onClick={() => onDeleteLink?.(id)}><FaTrashAlt /><div>Delete</div></button>
            </div>}
        </div>
    )
}

export default QuickLinkCard
