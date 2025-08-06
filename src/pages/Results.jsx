import React, { useContext, useEffect, useRef } from 'react';
import { useSearchParams, useLocation, useNavigate, NavLink } from 'react-router';
import WebSearchForm from '../components/common/WebSearchForm/WebSearchForm';
import SearchTypeButton from '../components/common/buttons/SearchTypeButton';
import useSearchResult from '../hooks/useSearchResult';
import useNews from '../hooks/useNews';
import { ThemeContext } from '../components/core/layout/Layout';
import SearchResultItem from '../components/core/layout/searchtab/SearchResultItem';
import ImageResultItem from '../components/core/layout/searchtab/ImageResultItem';
import NewsResult from '../components/core/layout/newstab/NewsResult';
import useVideo from '../hooks/useVideo';
import VideoResults from '../components/core/layout/videotab/VideoResults';
import WebResult from '../components/core/layout/webtab/WebResult';
import ImageResult from '../components/core/layout/imagetab/ImageResult';

const Results = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const type = searchParams.get("type");
  const { toggleThemeMode } = useContext(ThemeContext);
  const observerRef = useRef(null);
  const newsObserverRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();


  const renderResults = () => {
    if (type === "video") {
      return <VideoResults query={q}/>
    }


    if (type === "image") {
      return <ImageResult query={q} type={type}/>
    }

    if (type === "news") {
      return <NewsResult query={q}/>;
    }

    return <WebResult query={q} type={type}/>
  };

  const isActiveType = (t) => {
    if (t === "all") return !type;
    return type === t;
  };

  const changeActiveType = (type) => {
    type === "all"
      ? navigate(`/results?q=${q}`)
      : navigate(`/results?q=${q}&type=${type}`);
  };

  return (
    <div className='w-full'>
      <div
        className={`sticky py-2 px-2 z-20 top-0 left-0 flex justify-center border-b border-b-gray-600 ${toggleThemeMode === "dark" ? "bg-gray-950" : "bg-gray-100"
          } w-full items-center py-4`}
      >
        <div className='flex max-md:flex-col items-center gap-5 md:gap-10 w-full max-w-[1200px]'>
          <NavLink to={'/'} className='text-orange-500 font-bold max-md:text-2xl text-3xl'>
            BulletSearch
          </NavLink>
          <div className='flex flex-col gap-4 justify-center w-full'>
            <WebSearchForm />
            <div className='flex items-center overflow-auto gap-2 px-2 text-sm'>
             {/*  <SearchTypeButton onClickActive={changeActiveType} name={"AI"} type="ai"isActive={isActiveType} /> */}
              <SearchTypeButton onClickActive={changeActiveType} name={"Web"} type={"all"} isActive={isActiveType} />
               <SearchTypeButton onClickActive={changeActiveType} name={"Video"} type={"video"} isActive={isActiveType} />
              <SearchTypeButton onClickActive={changeActiveType} name={"Images"} type={"image"} isActive={isActiveType} />
              <SearchTypeButton onClickActive={changeActiveType} name={"News"} type={"news"} isActive={isActiveType} />
            </div>
          </div>
        </div>
      </div>

      
        <div className='w-full'>
          {renderResults()}
        </div>
      
      
    </div>
  );
};

export default Results;
