import React from "react";

function HeaderProfile() {
  return (
    <div className="animate-pulse  md:py-14 md:px-28 py-7 px-10">
      <div className="flex space-x-5 items-center">
        {/* image */}
        <div>
          <div className="h-24 w-24 md:w-40 md:h-40 rounded-full bg-gray-200 dark:bg-[#353535] " />
        </div>

        <div className="space-y-2 w-full">
          <div className="h-7 w-[20rem] bg-gray-200 dark:bg-[#353535] rounded-md" />
          <div className="h-6 w-[10rem] bg-gray-200 dark:bg-[#353535] rounded-md" />
          <div className="h-5 w-1/2 bg-gray-200 dark:bg-[#353535] rounded-md" />
          <div className="h-5 w-1/2 bg-gray-200 dark:bg-[#353535] rounded-md" />
        </div>
      </div>
    </div>
  );
}

export default HeaderProfile;
