import React from "react";

function CardVertical() {
  return (
    <div className="animate-pulse ">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-2 md:-space-y-4 ">
          <div className="flex space-x-3 items-center ">
            <div className="w-9 h-9 bg-gray-200 dark:bg-[#353535] rounded-full" />
            <div className="flex space-x-2 w-full">
              <div className="bg-gray-200 h-5 w-40 dark:bg-[#353535] rounded-md" />
              <div className="bg-gray-200 h-5 w-5 dark:bg-[#353535] rounded-full" />
              <div className="bg-gray-200 h-5 w-40 dark:bg-[#353535] rounded-md" />
            </div>
          </div>
          <div className="flex items-center space-x-10">
            {/* content */}
            <div className="space-y-2 w-full">
              <div className="bg-gray-200 block md:hidden w-full h-60 dark:bg-[#353535] rounded-md" />

              <div className="bg-gray-200 h-5 w-1/2 dark:bg-[#353535] rounded-md" />
              <div className="bg-gray-200 h-5 w-full dark:bg-[#353535] rounded-md" />
              <div className="bg-gray-200 h-5 w-1/2 dark:bg-[#353535] rounded-md" />

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="bg-gray-200 h-8  w-32 dark:bg-[#353535] rounded-md" />

                  <div className="bg-gray-200 h-8  w-32 dark:bg-[#353535] rounded-md" />
                </div>
                <div className="flex space-x-2 ">
                  {/* share */}
                  <div className="w-8 h-8 bg-gray-200 dark:bg-[#353535] rounded-full" />
                  {/* dots */}
                  <div className="w-8 h-8 bg-gray-200 dark:bg-[#353535] rounded-full" />
                </div>
              </div>
            </div>
            {/* image */}
            <div className="bg-gray-200 w-64 h-44 dark:bg-[#353535] rounded-md hidden md:block" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardVertical;
