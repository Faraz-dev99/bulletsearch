import React, { useState } from 'react';
import WeatherSearchForm from '../WeatherSearchForm/WeatherSearchForm';
import { FaEdit } from 'react-icons/fa';
import { FaLocationDot, FaTrash } from 'react-icons/fa6';

const WeatherManage = ({ onClose, searchWeather, currentCity, setCurrentCity, cities, setCities }) => {
    const [city, setCity] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [selectedCities, setSelectedCities] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (city.trim()) {
            const result = await searchWeather(city.trim());
            if (result) {
                setCurrentCity(() => {
                    localStorage.setItem("currentCity", JSON.stringify(city.trim()));
                    return city.trim();
                });
                setCities((prev) => {
                    const updated = [...prev, city.trim()];
                    localStorage.setItem("cities", JSON.stringify(updated));
                    return updated;
                });
            } else {
                console.log("City not found, not saving");
            }
            setCity("");
            onClose?.();
        }
    };

    const handleCurrentCity = (city) => {
        if (!editMode) {
            setCurrentCity(() => {
                localStorage.setItem("currentCity", JSON.stringify(city.trim()));
                return city.trim();
            });
        }
         onClose?.();
    };

    const toggleSelectCity = (city) => {
        setSelectedCities((prev) =>
            prev.includes(city)
                ? prev.filter((c) => c !== city)
                : [...prev, city]
        );
    };

    const handleDelete = () => {
        const updated = cities.filter((c) => !selectedCities.includes(c));

        if (selectedCities.includes(currentCity)) {
            localStorage.removeItem("currentCity");
            setCurrentCity(null);
        }

        setCities(updated);
        localStorage.setItem("cities", JSON.stringify(updated));

        setSelectedCities([]);
        setEditMode(false);
    };

    return (
        <div className='flex flex-col gap-2 relative'>
            <div>
                <p className='mb-2 font-bold'>Add City</p>
                <WeatherSearchForm city={city} setCity={setCity} handleSubmit={handleSubmit} />
            </div>

            {cities.length > 0 && <div className='font-bold mb-2 flex justify-between items-center'>
                <p>Manage Cities</p>
                <button className=' cursor-pointer' onClick={() => setEditMode((prev) => !prev)}>
                    <FaEdit />
                </button>
            </div>}


            <div className='overflow-auto max-h-[200px]'>
                {cities.map((e, i) => (
                    <div
                        key={i}
                        className='flex justify-between items-center bg-gray-200 dark:bg-gray-800 hover:bg-gray-700 rounded-md py-2 px-3 mb-2 cursor-pointer'
                        onClick={() => { handleCurrentCity(e)}}
                    >
                        <p className=' flex items-center gap-2'><FaLocationDot />{e}</p>
                        {editMode && (
                            <input
                                type='checkbox'
                                checked={selectedCities.includes(e)}
                                onChange={() => toggleSelectCity(e)}
                                onClick={(ev) => ev.stopPropagation()} // prevent city select click
                            />
                        )}
                    </div>
                ))}
            </div>

            {editMode && (
                <div className=' w-full grid place-items-center'>
                    <button
                    className='mt-2 py-2 cursor-pointer text-sm w-1/2 text-red-500 flex flex-col gap-1 bg-red-500/20 rounded-lg  items-center  justify-center'
                    onClick={handleDelete}
                >
                    <FaTrash />
                    <p>Delete</p>
                </button>
                </div>
            )}
        </div>
    );
};

export default WeatherManage;
