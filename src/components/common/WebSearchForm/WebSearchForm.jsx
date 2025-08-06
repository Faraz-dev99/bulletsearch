import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { useNavigate, useSearchParams } from 'react-router';
import { ThemeContext } from '../../core/layout/Layout';
import { IoMdClose } from "react-icons/io";
const WebSearchForm = () => {
    const navigate=useNavigate();
    const {toggleThemeMode,setToggleThemeMode}=useContext(ThemeContext);
    const [isresetSearchQuery,setIsReseatSearchQuery]=useState(false);
    const [searchQuery,setSearchQuery]=useState("");
     const [searchParams] = useSearchParams();

    useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearchQuery(q);
  }, [searchParams]);

  useEffect(()=>{
    searchQuery==""?setIsReseatSearchQuery(false):setIsReseatSearchQuery(true);
  },[searchQuery])

    const handleSearchForm=async (e)=>{
        e.preventDefault();
        if(searchQuery=="") return;
        navigate(`/results?q=${searchQuery}`)
    }
  return (
      <form onSubmit={handleSearchForm} className={` w-full max-w-[600px] relative overflow-hidden py-2 px-4 rounded-2xl border-[0.1px] dark:border-gray-700/50 border-gray-300/30 ${toggleThemeMode=="dark"?" text-gray-200 bg-gray-800":"text-gray-900 bg-indigo-100"} `}>
            <input value={searchQuery} className={` bg-transparent w-full outline-none  ${toggleThemeMode=="dark"?"placeholder:text-gray-400":"placeholder:text-gray-600"}`} onChange={(e)=>setSearchQuery(e.target.value)} placeholder='Search Anything...'/>
            <div className='absolute flex items-center gap-2 right-0 cursor-pointer top-1/2 -translate-y-1/2 px-4 py-4'>
            {isresetSearchQuery&&<button type='button' onClick={()=>setSearchQuery("")} className='  cursor-pointer text-2xl font-bold hover:text-orange-500'><IoMdClose /></button>} 
            <button type='submit' className='  cursor-pointer text-2xl font-bold hover:text-orange-500'><CiSearch /></button>          
            </div>
            
      </form>
  )
}

export default WebSearchForm
