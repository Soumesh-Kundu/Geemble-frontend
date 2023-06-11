import { useRef } from 'react';
import {AiOutlineSearch} from 'react-icons/ai'
export default function Searchbar({name,handleChange,hidden}) {
  return (
    <div className={`flex-grow flex items-center justify-center py-4 px-4 md:p-4 bg-nav-gradient sticky top-[4.8rem]  overflow-y-auto md:top-[4.73rem] z-10 rounded-b-3xl -translate-y-2 md:translate-y-0 `}>
      <div className="relative w-full md:w-3/4 lg:w-1/2 z-30">
        <label
          htmlFor="search"
          className="absolute left-5 top-1/2 flex items-center gap-2 -translate-y-1/2 text-2xl font-light text-[#4783cc]"
        >
          <AiOutlineSearch />
          <span className={`${name.length?'visible':'invisible'} text-xl`}>@</span>
        </label>
        <input
          type="text"
          id="search"
          value={name}
          onChange={({target:{value}})=>{handleChange(value)}}
          className="w-full h-12 rounded-3xl pl-[4.6rem] px-14 text-lg outline-none no-underline text-[#4783cc]"
        />
      </div>
    </div>
  );
}
