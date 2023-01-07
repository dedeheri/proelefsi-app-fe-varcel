import React from "react";

// logo
import { logo, logoLight } from "../../assets/image";
// icons
import { Bars3Icon } from "@heroicons/react/24/outline";
// utils
import { getAllCookies } from "../../utils/Cookie";
// compontens
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SLIDE_SIDEBAR } from "../../constants/actiontypes/other";

function Navbar({ profile, handleShowFeedback }) {
  const cookie = getAllCookies();

  const dispatch = useDispatch();

  function onClickShowSidebar() {
    dispatch({ type: SLIDE_SIDEBAR, sidebar: true });
  }

  return (
    <div className="h-16 z-50 sticky top-0 w-full bg-white dark:bg-black border-b dark:border-[#353535] flex items-center px-3 md:px-5 justify-between">
      <div className="flex items-center md:space-x-3 space-x-2 w-36">
        <button
          onClick={onClickShowSidebar}
          className="dark:text-gray-400 block  md:hidden dark:hover:text-white hover:bg-gray-100 p-2 rounded-full duration-300 dark:hover:bg-[#353535]"
        >
          <Bars3Icon className="w-6 md:w-7" />
        </button>

        {/* image */}
        {cookie.theme === "dark" ? (
          <Link to={"/dashboard"}>
            <img src={logoLight} className="w-28 md:w-32" alt="logo" />
          </Link>
        ) : (
          <Link to={"/dashboard"}>
            <img src={logo} className="w-28 md:w-32" alt="logo" />
          </Link>
        )}
      </div>

      <Profile profile={profile} handleShowFeedback={handleShowFeedback} />
    </div>
  );
}

export default Navbar;
