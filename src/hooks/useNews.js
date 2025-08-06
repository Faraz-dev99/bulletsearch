import { useEffect, useState, useRef } from "react";
import { NEWSAPI_KEY } from "../config";


const useNews = (query) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const prevQuery = useRef("");

  const fetchNews = async (pageNum) => {
    setLoading(true);
    try {
      const from = new Date();
      from.setDate(from.getDate() - 29); // max 29 days ago
      const fromDate = from.toISOString().split("T")[0];

      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&from=${fromDate}&sortBy=publishedAt&pageSize=30&page=${pageNum}&apiKey=${NEWSAPI_KEY}`
      );

      const data = await res.json();
      console.log(data);

      if (pageNum === 1) {
        setNews(data.articles || []);
      } else {
        setNews((prev) => [...prev, ...(data.articles || [])]);
      }

      setHasMore((data.articles || []).length > 0);
    } catch (err) {
      console.error("News fetch failed:", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!query) return;
    if (prevQuery.current !== query) {
      setNews([]);
      setPage(1);
      prevQuery.current = query;
      fetchNews(1);
    }
  }, [query]);

  useEffect(() => {
    if (page > 1) {
      fetchNews(page);
    }
  }, [page]);

  const fetchMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  return { news, loading, hasMore, fetchMore };
};

export default useNews;
