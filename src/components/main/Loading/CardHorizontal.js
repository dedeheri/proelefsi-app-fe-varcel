import React from "react";

function CardHorizontal() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-6 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="flex space-x-3 items-center ">
            <div className="w-9 h-9 bg-gray-200 dark:bg-[#353535] rounded-full" />
            <div className="w-40 h-5 bg-gray-200 dark:bg-[#353535] rounded-md" />
          </div>

          <div className="space-y-2">
            <div className="w-full bg-gray-200 dark:bg-[#353535] h-44 rounded-md opacity-100 group-hover:opacity-80 duration-300" />
            <div className="space-y-1">
              <div className="w-full h-5 bg-gray-200 dark:bg-[#353535] rounded-md" />
              <div className="w-full h-5 bg-gray-100 dark:bg-[#252525] rounded-md" />
              <div className="w-full h-5 bg-gray-100 dark:bg-[#252525] rounded-md" />
              <div className="w-1/2 h-5 bg-gray-100 dark:bg-[#252525] rounded-md" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <div className="w-32 h-5 bg-gray-200 dark:bg-[#252525] rounded-md" />
              <div className="w-40 h-5 bg-gray-200 dark:bg-[#252525] rounded-md" />
            </div>
            <div className="flex space-x-2">
              <div className="w-5 h-5 bg-gray-200 dark:bg-[#252525] rounded-full" />
              <div className="w-5 h-5 bg-gray-200 dark:bg-[#252525] rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardHorizontal;
