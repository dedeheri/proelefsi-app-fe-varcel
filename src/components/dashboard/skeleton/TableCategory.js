import React from "react";

function TableCategory() {
  return [...Array(4)].map((_, i) => (
    <div key={i} className="px-3 md:px-8 lg:px-14  pt-6">
      <div className="flex space-x-4 animate-pulse">
        <div className="h-7 w-full bg-gray-200 dark:bg-[#353535] rounded-md" />
        <div className="h-7 w-full bg-gray-200 dark:bg-[#353535] rounded-md" />
        <div className="h-7 w-full bg-gray-200 dark:bg-[#353535] rounded-md" />
        <div className="h-7 w-full bg-gray-200 dark:bg-[#353535] rounded-md" />
        <div className="h-7 w-full bg-gray-200 dark:bg-[#353535] rounded-md" />
      </div>
    </div>
  ));
}

export default TableCategory;
