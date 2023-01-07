import {
  ArrowUpRightIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { createSearchParams, useNavigate } from "react-router-dom";

import { Popover, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  searchTerm,
  searchTermHistoryAction,
} from "../../constants/action/main";
import { CLEAR_SEARCHTERM } from "../../constants/actiontypes/main";

function Search() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTermValue, setSearchTermValue] = useState("");

  const { fetching, error, data } = useSelector((state) => state.searchTerm);
  const { loading, result: dataHistory } = useSelector(
    (state) => state.searchTermHistoryReducer
  );

  function onSubmit(e) {
    e.preventDefault();
    const q = searchTermValue;
    navigate({
      pathname: "/search",
      search: `${createSearchParams({
        q: q,
      })}`,
    });
  }

  useEffect(() => {
    dispatch(searchTerm(searchTermValue));
  }, [dispatch, searchTermValue]);

  useEffect(() => {
    dispatch(searchTermHistoryAction());
  }, [dispatch]);

  useEffect(() => {
    return () => dispatch({ type: CLEAR_SEARCHTERM });
  }, [dispatch]);

  return (
    <Popover className="relative">
      <Popover.Button>
        <div
          data-tip={"Pencarian"}
          className="dark:text-gray-400  text-[#5E5E5E] hover:text-black dark:hover:text-white mt-1.5"
        >
          <MagnifyingGlassIcon className="w-6" />
        </div>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-500"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-50 top-1 right-0 rounded-md  w-[24rem] md:w-[30rem]">
          <div className="overflow-hidden px-2 py-2 shadow-lg dark:shadow-slate-900 bg-white dark:bg-[#19191a] rounded-lg border dark:border-[#353535] space-y-5">
            {/* search */}
            <div className="flex space-x-2 items-center px-2">
              <MagnifyingGlassIcon className="w-6 h-6 dark:text-gray-400  text-[#5E5E5E]" />
              <form className="w-full " onSubmit={onSubmit}>
                <input
                  defaultValue={searchTerm || ""}
                  onChange={(e) => setSearchTermValue(e.target.value)}
                  className="bg-gray-100 h-9 dark:bg-[#2e2e2e] px-3 w-full rounded-md outline-none"
                  autoFocus={true}
                />
              </form>
              <button className="dark:text-gray-400 text-[#5E5E5E]  bg-gray-200 dark:bg-[#3c3c3d] text-sm rounded-lg px-2 font-medium ">
                ESC
              </button>
            </div>
            {/* result */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between px-2">
                  {searchTermValue.length > 0 && (
                    <h1 className="text-md dark:text-gray-400  text-[#5E5E5E]">
                      Result for{" "}
                      <span className="font-medium text-black dark:text-white">
                        {searchTermValue}
                      </span>
                    </h1>
                  )}

                  {fetching && (
                    <svg
                      className="animate-spin  h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  )}
                </div>

                {error
                  ? null
                  : searchTermValue.length > 0 &&
                    data.map((x, i) => (
                      <div
                        key={i}
                        className="flex space-x-10 justify-between px-2 items-center hover:dark:bg-[#3c3c3d] hover:bg-gray-200 rounded-md duration-300 cursor-pointer  py-1 "
                      >
                        <span className="truncate">{x.title}</span>
                        <ArrowUpRightIcon className="w-5 h-5 dark:text-gray-400  text-[#5E5E5E] truncate " />
                      </div>
                    ))}
              </div>

              {dataHistory.length > 0 && (
                <div>
                  <div className="flex space-x-2 items-center px-2">
                    <h1 className="text-md dark:text-gray-400  text-[#5E5E5E]">
                      Terakhir dicari
                    </h1>
                  </div>

                  {dataHistory.map((_, index) => (
                    <div
                      key={index}
                      className="flex space-x-10 justify-between px-2 items-center hover:dark:bg-[#3c3c3d] hover:bg-gray-200 rounded-md duration-300 cursor-pointer  py-1 "
                    >
                      <div className="flex space-x-2 items-center">
                        <ClockIcon className="w-5 h-5 dark:text-gray-400  text-[#5E5E5E] " />
                        <span className="truncate">{_}</span>
                      </div>
                      <XMarkIcon className="w-5 h-5 dark:text-gray-400  text-[#5E5E5E] truncate " />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default Search;
