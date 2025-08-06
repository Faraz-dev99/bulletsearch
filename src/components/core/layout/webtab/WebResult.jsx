import React from 'react'
import useSearchResult from '../../../../hooks/useSearchResult';
import SearchResultItem from '../searchtab/SearchResultItem';

const WebResult = ({query,type}) => {
    const {
    results: webResults,
    loading: loadingWeb,
    loadingMore,
    hasMore,
    fetchMore,
    currentKeyIndex
  } = useSearchResult(query, type);
  if (loadingWeb) {
      return <p className="py-6 text-center text-gray-500">Loading results...</p>;
    }

    if (webResults.length === 0) {
      return (
        <div className="py-10 text-center text-gray-500">
          <h2 className="text-xl font-semibold mb-2">No results found</h2>
          <p>Try a different keyword or check your spelling.</p>
        </div>
      );
    }

    return (
      <div className='w-full px-4 flex justify-center'>
        <div className='max-w-[900px] w-full'>
      <div className='pt-10'>
        <div className='flex flex-col gap-12 py-4'>
          {webResults.map((item, i) => (
            <SearchResultItem key={i} item={item} />
          ))}
          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={fetchMore}
                disabled={loadingMore}
                className="px-4 py-2 cursor-pointer bg-orange-500 text-white rounded hover:bg-orange-600 disabled:opacity-50"
              >
                {loadingMore ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>
      </div>
      </div>
      </div>
    );
}

export default WebResult
