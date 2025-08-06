import React, { useState } from 'react'
import SearchResultItem from '../layout/searchtab/SearchResultItem'

const WebSearch = () => {
    const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [startIndex, setStartIndex] = useState(1)
  const [hasMore, setHasMore] = useState(false)

const apiKey="AIzaSyB2WlIstxH2rH1nKFOQkRg-QYyKtlAjdKE";
     const cx="31db3f3dae24d4b2f";

  const handleSearch = async (isNewSearch = true) => {
    const index = isNewSearch ? 1 : startIndex

    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
      query
    )}&key=${apiKey}&cx=${cx}&start=${index}`

    try {
      const response = await fetch(url)
      const data = await response.json()

      const items = data.items || []
      console.log(items)

      if (isNewSearch) {
        setResults(items)
      } else {
        setResults(prev => [...prev, ...items])
      }

      // Update for next batch
      setStartIndex(index + 10)

      // Whether more results are available
      setHasMore(!!data.queries?.nextPage)
    } catch (error) {
      console.error("Search error:", error)
    }
  }

  return (
    <div className=' p-4'>
      <div className="mt-10 space-y-8">
        {results.map((item, i) => {
          const url = new URL(item.link)
          const domain = url.hostname.replace(/^www\./, "")
          const favicon = `https://www.google.com/s2/favicons?sz=64&domain=${domain}`

          return (
            <div key={i} className="leading-snug">
              {/* Link + Favicon */}
              <div className="text-[#202124] text-[14px] mb-1 flex items-center gap-2">
                <img src={favicon} alt="favicon" className="w-[10px]" />
                <span className="truncate">{domain}</span>
              </div>

              {/* Title */}
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#1a0dab] text-[18px] leading-tight font-medium hover:underline"
              >
                {item.title}
              </a>

              {/* Snippet */}
              <p className="text-[#4d5156] mt-1">{item.snippet}</p>
            </div>
          )
        })}
      </div>

      {hasMore && (
        <button
          onClick={() => handleSearch(false)}
          className="mt-4 bg-gray-700 text-white p-2"
        >
          Load More
        </button>
      )}
    </div>
  )
}

export default WebSearch
