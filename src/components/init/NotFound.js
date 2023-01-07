import React from "react";

function NotFound({ message }) {
  return (
    <div className="mt-32 flex justify-center font-serif ">
      <div className="space-y-5">
        <h1 className="text-8xl flex justify-center text-gray-500">404</h1>
        <p className="flex justify-center text-3xl">{message}</p>
      </div>
    </div>
  );
}

export default NotFound;
