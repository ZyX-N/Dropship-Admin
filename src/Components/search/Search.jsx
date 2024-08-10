import React from 'react'
import { BiSearch } from 'react-icons/bi'

const Search = ({ search, setSearch, handleSearch }) => {
    const handleChange = (e) => {
        setSearch(e.target.value)
    }

    return (
        <>
            <div className='w-full  flex items-center justify-end'>
                <div className="w-[50%] h-[6vh]  flex items-center justify-between overflow-hidden border border-blue-500 outline-none   rounded-md pr-1  ">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 rounded-l-md w-[15%] h-full flex px-[1vw]  items-center border-2  border-blue-500 " onClick={handleSearch}>
                        <BiSearch
                            className="font-bold md:size-[2vw] size-[3vw] text-white text-center" />
                    </button>

                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search..."
                        className="w-[85%] h-full px-2 text-xs md:text-sm rounded-e-md  outline-none transition-all "
                        onChange={handleChange} />
                </div>
            </div>
        </>
    )
}

export default Search