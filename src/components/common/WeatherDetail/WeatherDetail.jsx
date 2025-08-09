import React from 'react'

const WeatherDetail = ({icon,iconColor,name,data,dataSymbol}) => {
    return (
        <div className=" flex gap-3 items-center py-2 px-3 rounded-md bg-gray-300 dark:bg-gray-900">
            <p className={` ${iconColor}  text-4xl `}>{icon}</p>
            <div className=" flex flex-col gap-1">
                <h3 className=" text-gray-500">{name}</h3>
                <p>{data}{dataSymbol}</p>
            </div>
        </div>
    )
}

export default WeatherDetail
