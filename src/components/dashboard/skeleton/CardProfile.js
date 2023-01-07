import React from "react";

function CardProfile() {
  return (
    <div className=" animate-pulse space-y-4">
      {[...Array(3)].map((_, i) => (
        <div className="lg:flex lg:space-x-4  space-y-3 ">
          <div className="lg:w-80 lg:h-32 h-[15rem] w-full bg-cover bg-gray-200 dark:bg-[#353535] rounded-md" />
          <div className="w-full space-y-2">
            <div className="h-6 w-1/2 bg-gray-200 dark:bg-[#353535] rounded-md" />
            <div className="h-6 w-full bg-gray-200 dark:bg-[#353535] rounded-md" />
            <div className="h-6 w-1/3 bg-gray-200 dark:bg-[#353535] rounded-md" />
            <div className="h-6 w-1/5 bg-gray-200 dark:bg-[#353535] rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardProfile;
