import React from "react";

function Alert({ message, color, position }) {
  return (
    <div className="relative z-50">
      <div
        className={`h-14 w-full fixed top-0 flex items-center px-2 ${color}`}
      >
        <h1 className="font-medium"> {message}</h1>
      </div>
    </div>
  );
}

export default Alert;
