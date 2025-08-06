import React from 'react'
import { MdInsertPhoto } from "react-icons/md";
const SearchResultItem = ({ item }) => {
    const url = new URL(item.link);
    const domain = url.hostname.replace(/^www\./, "");

    const favicon = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;
    const fullLogo = `https://logo.clearbit.com/${domain}`;

    const previewImage = item.pagemap?.cse_image?.[0]?.src;

    const displayImage = previewImage || fullLogo;

    return (
        <div className="flex max-md:flex-col gap-8 items-center">
            <div className="relative flex justify-center items-center bg-gray-100 max-md:w-full md:min-w-[160px] md:h-[160px] max-h-[200px] md:max-w-40 rounded-md overflow-hidden">
                <MdInsertPhoto className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-0 text-gray-300 text-7xl" />
                <img
                    src={displayImage}
                    onError={(e) => (e.currentTarget.src = favicon)}
                    alt="preview"
                    className="z-10  w-full h-full object-cover"
                />
            </div>



            <div className='flex flex-col gap-4'>
                <a href={item.link} className='text-orange-500 hover:underline text-xl font-semibold'>
                    {item.title}
                </a>

                <div className="text-[#202124] text-[14px] mb-1 flex items-center gap-2">
                    <img src={favicon} alt="favicon" className="w-[20px]" />
                    <a className="truncate text-gray-500 hover:text-gray-950 dark:hover:text-gray-200" href={item.link}>
                        {domain}
                    </a>
                </div>

                <p>{item.snippet}</p>
            </div>
        </div>
    );
}

export default SearchResultItem
