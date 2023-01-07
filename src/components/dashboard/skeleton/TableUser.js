import React from "react";

function TableUser() {
  return (
    <div className="space-y-3 animate-pulse">
      <div className="flex space-x-10 py-3 px-7">
        <div className="w-full h-5 bg-gray-200 dark:bg-[#353535] rounded-md" />
        <div className="w-full h-5 bg-gray-200 dark:bg-[#353535] rounded-md" />
        <div className="w-full h-5 bg-gray-200 dark:bg-[#353535] rounded-md" />
        <div className="w-full h-5 bg-gray-200 dark:bg-[#353535] rounded-md" />
      </div>
      <div className="border-b dark:border-[#353535]" />
      {[...Array(7)].map((_, i) => (
        <div key={i}>
          <div className="flex items-center space-x-10 py-3 px-7">
            <div className="space-x-3 w-full flex">
              <div className="w-12 h-12 bg-gray-200 dark:bg-[#353535] rounded-full" />
              <div className="space-y-2">
                <div className="w-80 h-5 bg-gray-200 dark:bg-[#353535] rounded-md" />
                <div className="w-80 h-5 bg-gray-200 dark:bg-[#353535] rounded-md" />
              </div>
            </div>
            <div className="w-full h-5 bg-gray-200 dark:bg-[#353535] rounded-md" />
            <div className="w-full h-5 bg-gray-200 dark:bg-[#353535] rounded-md" />
            <div className="w-full h-5 bg-gray-200 dark:bg-[#353535] rounded-md" />
            <div className="w-32 h-5 bg-gray-200 dark:bg-[#353535] rounded-md" />
            <div className="w-32 h-5 bg-gray-200 dark:bg-[#353535] rounded-md" />
          </div>
          <div className="border-b dark:border-[#353535]" />
        </div>
      ))}
    </div>
  );
}

export default TableUser;
