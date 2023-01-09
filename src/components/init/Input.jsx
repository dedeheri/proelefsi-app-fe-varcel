import React from "react";

function input({ placeholder, type, error, ...rest }) {
  return (
    <div className="space-y-2">
      <div
        className={`h-10 md:h-11 flex items-center border dark:border-[#353535] rounded-md px-3 hover:bg-gray-100 dark:hover:bg-[#353535] duration-300 ${
          error ? "border-red-500 dark:border-red-500" : ""
        }`}
      >
        <input
          placeholder={placeholder}
          className="outline-none bg-transparent w-full"
          type={type}
          {...rest}
        />
      </div>

      {/* error message */}
      {error && <h1 className="text-red-500 font-medium">{error}</h1>}
    </div>
  );
}

export default input;
