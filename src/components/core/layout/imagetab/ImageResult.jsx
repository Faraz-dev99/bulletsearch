import React, { useEffect, useRef, useState } from "react";
import useSearchResult from '../../../../hooks/useSearchResult';
import ImageResultItem from '../searchtab/ImageResultItem';
import ImagePreview from "../../../common/popups/ImagePreview";

const ImageResults = ({ query }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    results,
    loading,
    loadingMore,
    hasMore,
    fetchMore,
  } = useSearchResult(query, "image");

  const observerRef = useRef();

  useEffect(() => {
    if (!results.length || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          fetchMore();
        }
      },
      { threshold: 1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasMore, loadingMore, fetchMore, results.length]);

  if (loading) {
    return <p className="py-6 text-center text-gray-500">Loading results...</p>;
  }

  if (!results.length) {
    return (
      <p className="py-6 text-center text-gray-500">
        No image results found.
      </p>
    );
  }

  return (
    <>
    <div className='w-full flex justify-center'>
        <div className='max-w-[1200px] w-full'>
      <div className="columns-2 md:columns-4 lg:columns-5 gap-4 space-y-4 p-4">
        {results.map((item, i) => (
          <ImageResultItem key={i} item={item} />
        ))}
      </div>

      {/* This MUST be outside columns layout */}
      <div ref={observerRef} className="h-10 w-full" />

      {loadingMore && <p className="text-center mt-4">Loading more...</p>}
      </div>
      </div>
    </>
  );
};

export default ImageResults;
