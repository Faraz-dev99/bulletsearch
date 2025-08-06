import { useEffect, useState, useRef } from "react";
import { YOUTUBE_CREDIDENTIAL } from "../config";


const useVideo = (query) => {
  const [videos, setVideos] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const currentQueryRef = useRef("");

  const fetchVideos = async ({ isLoadMore = false, pageTokenOverride = "" } = {}) => {
    if (!query || loading || !hasMore) return;

    setLoading(true);
    const key = YOUTUBE_CREDIDENTIAL[currentKeyIndex];
    const tokenToUse = isLoadMore ? pageTokenOverride : "";

    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${key}&q=${encodeURIComponent(query)}&type=video&part=snippet&maxResults=30&pageToken=${tokenToUse}`
      );
      const data = await res.json();

      console.log("videos", data);

      if (data?.items?.length) {
        setVideos((prev) => (isLoadMore ? [...prev, ...data.items] : data.items));
        setPageToken(data.nextPageToken || "");
        setHasMore(!!data.nextPageToken);
      } else if (data?.error && currentKeyIndex + 1 < API_KEYS.length) {
        setCurrentKeyIndex((prev) => prev + 1); // fallback to next key
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("YouTube API error:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query && query !== currentQueryRef.current) {
      currentQueryRef.current = query;
      setVideos([]);
      setPageToken("");
      setHasMore(true);
      setCurrentKeyIndex(0);
      fetchVideos(); // initial fetch without pageToken
    }
  }, [query]);

  const fetchMore = () => {
    if (hasMore && !loading) {
      fetchVideos({ isLoadMore: true, pageTokenOverride: pageToken });
    }
  };

  return { videos, loading, hasMore, fetchMore };
};

export default useVideo;
