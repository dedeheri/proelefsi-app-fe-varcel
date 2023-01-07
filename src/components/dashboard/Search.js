import React, { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { createSearchParams, useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  function handleSearchCategory(e) {
    e.preventDefault();
    navigate({
      search: `${createSearchParams({
        search: searchTerm,
      })}`,
    });
  }

  return (
    <>
      <form className="md:hidden flex" onSubmit={handleSearchCategory}>
        <div className="flex space-x-2">
          <MagnifyingGlassIcon
            onClick={() => setShowSearch(true)}
            className="w-6 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white duration-300"
          />
          {showSearch && (
            <>
              <input
                className="border-b outline-none w-36 bg-transparent dark:border-[#353535]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <XMarkIcon
                onClick={() => setShowSearch(false)}
                className="w-6 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white duration-300"
              />
            </>
          )}
        </div>
      </form>
      <form className="hidden md:flex" onSubmit={handleSearchCategory}>
        <div className="border dark:border-[#353535] rounded-md flex items-center px-2 py-1 ">
          <MagnifyingGlassIcon className="w-5" />
          <input
            className="outline-none px-3  w-36 md:w-40 lg:w-48 h-7 bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </form>
    </>
  );
}

export default Search;
