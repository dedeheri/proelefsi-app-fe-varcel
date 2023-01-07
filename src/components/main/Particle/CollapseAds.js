import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useState } from "react";

function CollapseAds() {
  const [collapse, setCollapse] = useState(true);

  function onClickCLoseCollapseAds() {
    setCollapse((prev) => !prev);
  }
  return (
    <div
      className={` w-full  fixed duration-500 border-t  bottom-0 dark:border-[#353535] bg-white text-black dark:text-white dark:bg-black  ${
        collapse ? "translate-y-auto" : "translate-y-full"
      }`}
    >
      <div className="max-w-2xl mx-auto p-2 space-y-4 mb-3">
        <div className="flex  justify-end px-4 py-2">
          <button
            onClick={onClickCLoseCollapseAds}
            className="flex space-x-2 items-center"
          >
            <h1>Collapse</h1>
            <ChevronDownIcon className="w-5  dark:text-white" />
          </button>
        </div>
        <img
          alt="ads"
          className="h-28 w-full"
          src={
            "https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-ncino.jpg"
          }
        />
      </div>
    </div>
  );
}

export default CollapseAds;
