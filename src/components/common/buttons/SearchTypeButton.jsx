import React from 'react'

const SearchTypeButton = ({ onClickActive, name,type, isActive }) => {
    return (
        <button
            onClick={() =>onClickActive?.(type)}
            className={` cursor-pointer transition-all duration-500 text-gray-700 dark:text-gray-400 font-medium  py-2 px-3 rounded-md ${isActive(type) ? "bg-orange-500/30 text-orange-500 dark:text-orange-500" : "hover:bg-gray-200 hover:text-gray-950 dark:hover:bg-gray-900 dark:hover:text-gray-100"}`}
        >
            {name}
        </button>
    )
}

export default SearchTypeButton
