import React from 'react';
import { IoMdClose } from "react-icons/io";

const VideoPreview = ({ onClose, video, videoLink, videoTitle, videoDesc }) => {
  return (
    <div className="relative w-full max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">

      {/* Video Iframe */}
      <div className="w-full aspect-video bg-black">
        <iframe
          src={video}
          title={videoTitle}
          className="w-full h-full"
          allowFullScreen
        />
      </div>

      {/* Video Info */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
          {videoTitle}
        </h2>
        {videoDesc && (
          <p className="text-sm text-gray-600 dark:text-gray-500">
            {videoDesc}
          </p>
        )}
        <div className='flex items-center justify-between gap-4 mt-8'>
        <button
          type='button'
          className="dark:bg-gray-600 w-full dark:hover:bg-gray-600/80 text-sm bg-gray-200 hover:bg-gray-100 py-2 px-3 rounded-md cursor-pointer transition"
          onClick={onClose}
        >
          Cancel
        </button>
        <a
          href={videoLink}
          target="_blank"
          rel="noopener noreferrer"
          className=" w-full text-center bg-orange-500 text-white dark:text-gray-950 hover:bg-orange-500/80 py-2 px-2 rounded-md text-sm"
        >
          Watch on YouTube
        </a>
      </div>
        
      </div>
    </div>
  );
};

export default VideoPreview;
