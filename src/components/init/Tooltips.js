import React from "react";

function Tooltips({ label, position, children }) {
  return (
    <div className="relative ">
      <div className="bg-red-200 absolute">HOME</div>
      {children}
    </div>
  );
}

export default Tooltips;
