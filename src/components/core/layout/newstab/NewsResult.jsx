import React from 'react';
import useNews from '../../../../hooks/useNews';

const NewsResult = ({query}) => {
    const {
    news,
    loading: loadingNews,
    hasMore: newsHasMore,
    fetchMore: fetchMoreNews
  } = useNews(query);
  if (loadingNews && news.length === 0) {
        return <p className="py-6 text-center text-gray-500">Loading news...</p>;
      }
      if (news.length === 0) {
        return (
          <div className="py-10 text-center text-gray-500">
            <h2 className="text-xl font-semibold mb-2">No news found</h2>
            <p>Try a different keyword.</p>
          </div>
        );
      }
  return (
    <div className=" md:px-4 pt-5  overflow-hidden">
      <div className="grid grid-cols-1  lg:grid-cols-[2fr_1fr] items-center mb-10 gap-10">

        <div>
          {news.map((item, i) => {
          if(i==0) return <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg relative   min-h-[300px] max-h-[400px] overflow-hidden shadow hover:shadow-md transition"
          >
            {item.urlToImage && (
              <>
              <img
                src={item.urlToImage}
                alt={item.title}
                className="w-full h-full  min-h-[300px] max-h-[500px] lg:rounded-t-2xl object-cover transition-all duration-500 contrast-150 hover:sepia "
              />
              <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-gray-100 to-gray-100/20 dark:from-gray-950 dark:to-gray-950/50 pointer-events-none" />

              </>
              
              
            )}
            <div className="p-4 px-2 absolute bottom-0 left-0">
              <h2 className="text-3xl font-bold dark:text-gray-100 line-clamp-2">
                {item.title}
              </h2>
              <p className="text-sm dark:text-gray-100 mt-2 line-clamp-2">
                {item.description}
              </p>
              <div className=' flex justify-between mt-2'>
                <p className="text-xs mt-2 text-gray-500">
                {new Date(item.publishedAt).toLocaleString()}
              </p>
              <p className="text-xs mt-2 text-gray-500">
                {item.source.name}
              </p>
              </div>
              
            </div>
          </a>
})}
        </div>
        <div className=' flex flex-wrap px-4  md:flex-col gap-5'>
           {news.map((item,i)=>{
            if(i!=0 && i<5) return <div key={i} className=' flex gap-8 items-center'>
              <div className='flex justify-center items-center  border-red-500 bg-gray-100 w-full h-full  max-h-[120px] max-w-[100px] rounded-md'>
                <img
                    src={item.urlToImage}
                    alt="preview"
                    className="z-10  w-full h-full min-w-[100px] min-h-[100px] rounded-md object-cover cursor-pointer transition-all duration-500 contrast-150 hover:sepia"
                />
              </div>
              <div className=' flex flex-col gap-2'>
                <a href={item.url} className='text-orange-500 hover:underline text-lg font-semibold line-clamp-2'>
                    {item.title}
                </a>

                <div className="text-[#202124] text-[14px] mb-1 flex items-center gap-2">
                    <a className="truncate text-gray-500 hover:text-gray-950 dark:hover:text-gray-200" href={item.url}>
                        {item.source.name}
                    </a>
                </div>
              </div>
            </div>
           })}
        </div>
      </div>
      <div className="grid grid-cols-1 max-md:px-4 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item, i) => {
          if(i>4) return <a
            key={i}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg overflow-hidden shadow hover:shadow-md transition"
          >
            {item.urlToImage && (
              <img
                src={item.urlToImage}
                alt={item.title}
                className="w-full h-48 object-cover transition-all duration-500 contrast-150 hover:sepia"
              />
            )}
            <div className="p-4 px-2">
              <h2 className="text-lg font-bold text-orange-500 hover:underline ">
                {item.title}
              </h2>
              <p className="text-sm text-gray-800 dark:text-gray-400 mt-2 line-clamp-3">
                {item.description}
              </p>
              <div className=' flex justify-between mt-2'>
                <p className="text-xs mt-2 text-gray-600">
                {new Date(item.publishedAt).toLocaleString()}
              </p>
              <p className="text-xs mt-2 text-gray-600">
                {item.source.name}
              </p>
              </div>
              
            </div>
          </a>
})}
      </div>

      
      {newsHasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={fetchMoreNews}
                disabled={loadingNews}
                className="px-4 py-2 cursor-pointer bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
              >
                {loadingNews ? "Loading..." : "Load More Videos"}
              </button>
            </div>
          )}
      
    </div>
  );
};

export default NewsResult;
