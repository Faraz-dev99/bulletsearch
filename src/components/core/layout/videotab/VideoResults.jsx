import React, { useState } from 'react';
import useVideo from '../../../../hooks/useVideo';
import VideoPreview from '../../../common/popups/VideoPreview';
import PopupMenu from '../../../common/popups/PopupMenu';

const VideoResults = ({ query }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const {
    videos,
    loading: loadingVideo,
    hasMore: videoHasMore,
    fetchMore: fetchMoreVideo
  } = useVideo(query);

  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // in seconds

    const times = [
      { unit: "year", seconds: 31536000 },
      { unit: "month", seconds: 2592000 },
      { unit: "week", seconds: 604800 },
      { unit: "day", seconds: 86400 },
      { unit: "hour", seconds: 3600 },
      { unit: "minute", seconds: 60 },
      { unit: "second", seconds: 1 },
    ];

    for (let t of times) {
      const amount = Math.floor(diff / t.seconds);
      if (amount >= 1) {
        return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(-amount, t.unit);
      }
    }

    return "just now";
  }

  if (loadingVideo && videos.length === 0) {
    return <p className="py-6 text-center text-gray-500">Loading videos...</p>;
  }

  if (videos.length === 0) {
    return <div className="py-10 text-center text-gray-500">No video results found</div>;
  }

  return (
    <div className='w-full flex justify-center'>
        <div className='max-w-[1200px] w-full'>
          
        
    <div className='pt-10 px-4 w-full max-w-[1200px]  overflow-hidden'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {videos.map((video, i) => (
          <div key={i} className='border border-gray-500 dark:border-gray-700 rounded-lg p-4'>
            <img
              src={video.snippet.thumbnails.high
    ? video.snippet.thumbnails.high.url
    : video.snippet.thumbnails.medium
    ? video.snippet.thumbnails.medium.url
    : video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
              className='w-full h-auto cursor-pointer contrast-150 transition-all duration-500 hover:grayscale rounded'
              onClick={() => setSelectedVideo(video)}
            />
            <a
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <h3 className='mt-2 font-semibold text-md hover:underline hover:text-orange-500'>
                {video.snippet.title}
              </h3>
            </a>
            <div className='flex justify-between mt-2'>
              <p className='text-sm text-gray-600'>{video.snippet.channelTitle}</p>
              <p className='text-sm text-gray-600'>{timeAgo(video.snippet.publishTime)}</p>
            </div>
          </div>
        ))}
      </div>

      {videoHasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={fetchMoreVideo}
            disabled={loadingVideo}
            className="px-4 py-2 cursor-pointer bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
          >
            {loadingVideo ? "Loading..." : "Load More Videos"}
          </button>
        </div>
      )}

      {selectedVideo && (
        <PopupMenu onClose={() => setSelectedVideo(null)}>
          <VideoPreview
            onClose={() => setSelectedVideo(null)}
            video={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
            videoLink={`https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`}
            videoTitle={selectedVideo.snippet.title}
            videoDesc={selectedVideo.snippet.description}
          />
        </PopupMenu>
      )}
    </div>
    </div>
      </div>
  );
};

export default VideoResults;
