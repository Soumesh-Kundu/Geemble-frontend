import {AiOutlineSearch} from 'react-icons/ai'
export default function Searchbar({styling}) {
  return (
    <div className={`flex-grow flex items-center justify-center ${styling}`}>
      <div className="relative w-full md:w-3/4 lg:w-1/2 z-30">
        <label
          htmlFor="search"
          className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl font-light text-[#4783cc]"
        >
          <AiOutlineSearch />
        </label>
        <input
          type="text"
          id="search"
          className="w-full h-12 rounded-3xl px-14 text-lg outline-none no-underline text-[#4783cc]"
        />
      </div>
    </div>
  );
}
