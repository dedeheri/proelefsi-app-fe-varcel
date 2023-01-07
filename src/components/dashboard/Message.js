import React from "react";

function Message({ message }) {
  return (
    <div className="py-10 border-b dark:border-[#3A3B3C]">
      <h1 className="flex justify-center font-medium text-xl text-gray-400 dark:text-gray-600">
        {message}
      </h1>
    </div>
  );
}

export default Message;
