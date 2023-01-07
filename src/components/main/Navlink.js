import React, { useEffect, useReducer } from "react";

//
import { ArrowPathIcon } from "@heroicons/react/24/solid";

// redux
import { useSelector, useDispatch } from "react-redux";
import { getTopics } from "../../constants/action/main";
import { Link } from "react-router-dom";

function Navlink() {
  const [pageRelog, forcePageRelog] = useReducer((x) => x + 1, 0);
  const { data, loading, message, error } = useSelector(
    (state) => state.topics
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopics());
  }, [dispatch, pageRelog]);

  function handleRelog() {
    forcePageRelog();
  }

  return (
    <div
      className="h-9 z-40 w-full sticky top-0  bg-white dark:bg-black border-b dark:border-[#353535] flex items-center  px-3 md:px-5   
    "
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex space-x-4 ">
          {loading ? (
            <div className="w-full animate-pulse">
              <div className="flex space-x-2 ">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="h-5 w-full bg-gray-100 dark:bg-[#353535] rounded-md"
                  />
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="flex justify-between w-full">
              <p className="font-medium">{message}</p>
              <div
                onClick={handleRelog}
                className="flex cursor-pointer items-center space-x-1 text-green-600"
              >
                <ArrowPathIcon className="h-4" />
                <h1 className="font-medium">Try Again</h1>
              </div>
            </div>
          ) : (
            <div className="flex space-x-3 overflow-y-scroll scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-thin">
              {data?.slice(0, 18)?.map((d, i) => (
                <Link
                  to={`/topics/${d.topics.replaceAll(" ", "-")}?ref=nl`}
                  key={i}
                  className="!text-gray-500 hover:!text-black dark:!text-gray-400 hover:dark:!text-white duration-300 whitespace-nowrap"
                >
                  {d.topics}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navlink;
