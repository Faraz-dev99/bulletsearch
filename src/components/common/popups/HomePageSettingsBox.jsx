import React, { useEffect, useState } from 'react';
import { MdEdit } from 'react-icons/md';

const HomePageSettingsBox = ({ onClose, homePageSettings, onChangeHomePageSettings }) => {
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    // Deep clone to avoid mutating the parent directly
    setSettings(homePageSettings.map(item => ({ ...item })));
  }, [homePageSettings]);

  const handleToggle = (index) => {
    const updated = [...settings];
    updated[index].status = !updated[index].status;
    setSettings(updated);
  };

  const handleSave = () => {
    onChangeHomePageSettings(settings);
    onClose?.();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div className="">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="py-2 text-2xl font-semibold">Customize Homepage</h1>
      </div>

      <div className="flex flex-col mb-4">
        {settings.map((setting, index) => {
          return (
            <div key={index} className='flex justify-between py-4 border-b-[0.1px] border-b-gray-400 dark:border-b-gray-800'>
              <div className="text-sm font-medium">{setting.name}</div>
              <label className="relative inline-flex items-center cursor-pointer w-11 h-6">
                <input
                  type="checkbox"
                  checked={setting.status}
                  onChange={() => handleToggle(index)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-400 peer-checked:bg-orange-500 rounded-full transition-colors duration-300"></div>
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 peer-checked:translate-x-5"></div>
              </label>
            </div>
          );
        })}
      </div>

      <div className='flex float-right justify-between gap-4 mt-4'>
        <button
          type='button'
          className="dark:bg-gray-600 dark:hover:bg-gray-600/80 bg-gray-200 hover:bg-gray-100 py-2 px-3 rounded-md w-full cursor-pointer transition"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="bg-orange-500 text-white dark:text-gray-950 hover:bg-orange-500/80 py-2 px-3 rounded w-full cursor-pointer transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default HomePageSettingsBox;
