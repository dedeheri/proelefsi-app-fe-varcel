import React from "react";

function Topics() {
  return (
    <div className=" animate-pulse space-y-7">
      <div className="w-56 h-6 bg-gray-200 dark:bg-[#353535] rounded-md" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="w-full h-8 bg-gray-200 dark:bg-[#353535] px-6 py-2 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

export default Topics;
