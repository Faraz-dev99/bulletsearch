import { useEffect, useState, useRef } from "react";
import { GOOGLE_CREDIDENTIAL } from "../config";

const apiCredentials = [
  {
    KEY: "AIzaSyBUXmc3WnC2rSDMDVr3tRgTecJf9AqHPx4",
    CX: "c02e4f48f09164564"
  },
  {
    KEY: "AIzaSyB2WlIstxH2rH1nKFOQkRg-QYyKtlAjdKE",
    CX: "31db3f3dae24d4b2f"
  },
  
];

const useSearchResult = (query, searchType = "all") => {
  const [results, setResults] = useState([]);
  const [startIndex, setStartIndex] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [credIndex, setCredIndex] = useState(0);
  const retryCountRef = useRef(0);

  const fetchResults = async (isNewSearch = false, indexOverride = null, keyIndexOverride = null) => {
    const index = indexOverride !== null ? indexOverride : (isNewSearch ? 1 : startIndex);
    const keyIndex = keyIndexOverride !== null ? keyIndexOverride : credIndex;

    if (keyIndex >= apiCredentials.length) {
      console.error("All API keys exhausted.");
      return;
    }

    const { KEY, CX } = GOOGLE_CREDIDENTIAL[keyIndex];

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${KEY}&cx=${CX}&start=${index}${searchType === "image" ? "&searchType=image" : ""}`;

    if (isNewSearch) setLoading(true);
    else setLoadingMore(true);

    try {
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 429 || res.status === 403) {
          retryCountRef.current++;
          const nextKeyIndex = keyIndex + 1;

          if (nextKeyIndex < apiCredentials.length && retryCountRef.current < apiCredentials.length) {
            // Retry with next key
            fetchResults(isNewSearch, index, nextKeyIndex);
          } else {
            console.error("No more API keys available.");
          }
          return;
        } else {
          throw new Error(`HTTP error ${res.status}`);
        }
      }

      const data = await res.json();
      const items = data.items || [];

      setResults(prev => isNewSearch ? items : [...prev, ...items]);
      setStartIndex(index + 10);
      setHasMore(!!data.queries?.nextPage);

      if (keyIndex !== credIndex) {
        setCredIndex(keyIndex); // update current working key index
      }
    } catch (err) {
      console.error("Fetch error:", err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const fetchMore = () => {
    if (hasMore && !loadingMore) {
      fetchResults(false);
    }
  };

  useEffect(() => {
    if (!query) return;
    setStartIndex(1);
    setResults([]);
    setHasMore(true);
    retryCountRef.current = 0;
    setCredIndex(0);
    fetchResults(true, 1, 0); // Reset start and API key index
  }, [query, searchType]);

  return {
    results,
    loading,
    loadingMore,
    hasMore,
    fetchMore,
  };
};

export default useSearchResult;
