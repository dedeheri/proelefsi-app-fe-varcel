import React from "react";
import { useSelector } from "react-redux";
import { verify } from "../../../assets/image";

function Header() {
  const { result, loading, error, message } = useSelector(
    (state) => state.userMainReducer
  );

  return (
    <div className="space-y-10">
      {/* cover */}
      {result.cover_url && (
        <img
          src={result.cover_url}
          alt={result.fullname}
          className="h-[10rem] md:h-[20rem] w-full"
        />
      )}
      {/* avatar */}
      <div className="flex space-x-4">
        <img
          src={result.image_url}
          alt={result.fullname}
          className="border h-20 w-20 rounded-full"
        />
        <div>
          <div className="flex  items-center space-x-2">
            <h1 className="text-2xl font-medium"> {result.fullname}</h1>
            <img src={verify} alt="verify" className="w-5 h-5" />
          </div>
          <p className="leading-5 text-gray-500"> {result.bio}</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
