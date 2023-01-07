import React, { useState } from "react";

// icon
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function Password({ type, placeholder, error, ...rest }) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-2">
      <div
        className={`h-10 md:h-11 w-auto  flex justify-between items-center border dark:border-[#353535] dark:hover:bg-[#353535]  rounded-md px-3 hover:bg-gray-100 duration-300 ${
          error ? "border-red-500 dark:border-red-500" : ""
        }`}
      >
        <input
          autoComplete="current-password"
          placeholder={placeholder}
          className="outline-none bg-transparent w-full pr-3"
          type={show ? "text" : "password"}
          {...rest}
        />
        <div
          onClick={() => setShow(!show)}
          className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white duration-300 cursor-pointer"
        >
          {show ? (
            <EyeIcon className="w-5" />
          ) : (
            <EyeSlashIcon className="w-5" />
          )}
        </div>
      </div>
      {error && <h1 className="text-red-500 font-medium">{error}</h1>}
    </div>
  );
}

export default Password;
