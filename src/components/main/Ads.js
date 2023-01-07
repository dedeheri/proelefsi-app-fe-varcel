import React from "react";
import { getAllCookies } from "../../utils/Cookie";

function Ads() {
  const cookie = getAllCookies();
  return (
    <div className={cookie.theme === "dark" ? "dark" : "light"}>
      <div className="h-52 w-full dark:bg-[#1d1c1c] bg-gray-100 flex justify-center items-center">
        <div className="max-w-5xl mx-auto ">
          <img
            className="mx-auto "
            alt="ads"
            src={
              "https://www.wordstream.com/wp-content/uploads/2021/07/banner-ads-examples-ncino.jpg"
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Ads;
