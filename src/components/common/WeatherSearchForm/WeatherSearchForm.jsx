import React from 'react'
import { FaSearch } from 'react-icons/fa'

const WeatherSearchForm = ({city,setCity,handleSubmit}) => {
    return (
        <form onSubmit={(e)=>handleSubmit?.(e)} className="flex relative border overflow-auto border-gray-500  gap-2 mb-4">
            <input
                type="text"
                placeholder="Search city..."
                value={city}
                onChange={(e) => setCity?.(e.target.value)}
                className="flex-1 p-2 rounded outline-none"
            />
            <button type="submit" className=" absolute right-0 h-full top-1/2 -translate-y-1/2 px-4 py-2">
                <FaSearch />
            </button>
        </form>
    )
}

export default WeatherSearchForm
