import React from "react";

function Button({ label, ...rest }) {
  return (
    <button
      type="submit"
      {...rest}
      className="font-medium text-white text-md bg-[#2374e1] w-full h-10 md:h-11 flex items-center justify-center rounded-md hover:bg-blue-500 duration-300"
    >
      {label}
    </button>
  );
}

export default Button;
