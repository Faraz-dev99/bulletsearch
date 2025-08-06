import React, { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa';
import { IoMdDownload } from "react-icons/io";

const ImagePreview = ({onClose,item}) => {
     const [imageSrc, setImageSrc] = useState(item.image?.thumbnailLink);
      const [isLoaded, setIsLoaded] = useState(false);
      const [error, setError] = useState(false);
    useEffect(() => {
            const img = new Image();
            img.src = item.link;
            img.onload = () => {
                setImageSrc(item.link);
                setIsLoaded(true);
            };
            img.onerror = () => setError(true);
        }, [item.link]);

        
  return (
    <div className="relative w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">

      {/* Video Iframe */}
      
         <div className="relative bg-zinc-100" onClick={()=>setSelectedImage(item)}>
                    {!isLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/10 to-transparent animate-pulse" />
                    )}

                    {!error ? (
                        <img
                            src={imageSrc}
                            alt={item.title}
                            className={`w-full bg-black max-h-[300px] h-auto object-contain transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"
                                }`}
                        />
                    ) : (
                        <div className="aspect-video flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
                            Image unavailable
                        </div>
                    )}
                </div>


      {/* Video Info */}
      <div className="p-4">
        <div className="grid grid-cols-[7fr_3fr] items-center gap-2">
  <h2 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
    {item.title}
  </h2>
  {item && (
    <a
      href={imageSrc}
      download={item.title}
      className="justify-self-end text-gray-700 flex-shrink-0 border dark:border-gray-600 hover:bg-gray-600/80 hover:text-white bg-border-200  p-2 rounded-md transition"
    >
      <FaEye className="text-xl  dark:text-white" />
    </a>
  )}
</div>

        <div className='flex items-center justify-between gap-4 mt-8'>
        {/* <button
          type='button'
          className="dark:bg-gray-600 w-full dark:hover:bg-gray-600/80 text-sm bg-gray-200 hover:bg-gray-100 py-2 px-3 rounded-md cursor-pointer transition"
          onClick={onClose}
        >
          Cancel
        </button> */}
        <a
          href={item.image?.contextLink}
          target="_blank"
          rel="noopener noreferrer"
          className=" w-full text-center bg-orange-500 text-white dark:text-gray-950 hover:bg-orange-500/80 py-2 px-2 rounded-md"
        >
          Visit
        </a>
      </div>
        
      </div>
    </div>
  )
}

export default ImagePreview
