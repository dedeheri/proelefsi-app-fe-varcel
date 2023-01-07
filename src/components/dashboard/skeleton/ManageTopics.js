import React from "react";

function ManageTopics() {
  return (
    <div className="animate-pulse">
      <div className="border dark:border-[#3A3B3C] rounded-md w-72 ">
        <div className="py-2 px-5 dark:bg-[#1F1F1F]">
          <div className="h-6 w-1/2 bg-gray-200 dark:bg-[#353535] rounded-md " />
        </div>

        <div className="py-3 px-5 space-y-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex justify-between ">
              <div className="h-6 w-40 bg-gray-200 dark:bg-[#353535] rounded-md py-2 px-5" />
              <div className="h-6 w-10 bg-gray-200 dark:bg-[#353535] rounded-md py-2 px-5" />
            </div>
          ))}
        </div>

        <div className="border-b dark:border-[#3A3B3C] pt-10" />
        <div className="py-2 px-5">
          <div className="flex justify-between">
            <div className="h-6 w-20 bg-gray-200 dark:bg-[#353535] rounded-md" />
            <div className="h-6 w-20 bg-gray-200 dark:bg-[#353535] rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageTopics;
