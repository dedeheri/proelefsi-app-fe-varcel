import React, { useEffect, useState } from "react";

// icons
import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

// dom
import { Link } from "react-router-dom";

// image
import { logo, logoLight } from "../../assets/image";

// redux
import { useDispatch, useSelector } from "react-redux";
import { SLIDE_TOPICS } from "../../constants/actiontypes/other";
// utils
import { getAllCookies } from "../../utils/Cookie";
import Cookies from "js-cookie";
import Search from "./Search";
import MaxWidth from "./Particle/MaxWidth";

function Navbar() {
  // utils
  const cookie = getAllCookies();

  // redux
  const dispatch = useDispatch();
  const { slide_topics } = useSelector((state) => state.slideTopicsRedux);
  function handleSlide() {
    dispatch({ type: SLIDE_TOPICS, payload: !slide_topics });
  }

  const [themes, setThemes] = useState(cookie.theme);
  function changeTheme(theme) {
    setThemes(theme);
    window.location.reload();
  }
  useEffect(() => {
    Cookies.set("theme", themes, { expires: 30 });
  }, [themes]);

  return (
    <div className="h-14 bg-white dark:bg-black z-50 w-full  border-y dark:border-[#353535] flex items-center px-3 md:px-5">
      <div className="max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between">
          {/* image */}
          <div className="flex space-x-2">
            {slide_topics ? (
              <button
                data-tip={"Menu"}
                onClick={handleSlide}
                className="dark:text-gray-400  text-[#5E5E5E] hover:text-black dark:hover:text-white "
              >
                <XMarkIcon className="w-6" />
              </button>
            ) : (
              <button
                data-tip={"Menu"}
                onClick={handleSlide}
                className="dark:text-gray-400  text-[#5E5E5E] hover:text-black dark:hover:text-white "
              >
                <Bars3Icon className="w-6" />
              </button>
            )}
            {cookie.theme === "dark" ? (
              <Link to={"/"}>
                <img src={logoLight} className="w-28 md:w-32" alt="logo" />
              </Link>
            ) : (
              <Link to={"/"}>
                <img src={logo} className="w-28 md:w-32" alt="logo" />
              </Link>
            )}
          </div>

          {/* action */}
          <div className="space-x-2 flex items-center">
            <Search />

            {themes === "light" ? (
              <button
                data-tip={"Tema"}
                onClick={() => changeTheme("dark")}
                className="dark:text-gray-400  text-[#5E5E5E] hover:text-black dark:hover:text-white "
              >
                <MoonIcon className="w-6" />
              </button>
            ) : (
              <button
                data-tip={"Tema"}
                onClick={() => changeTheme("light")}
                className="dark:text-gray-400  text-[#5E5E5E] hover:text-black dark:hover:text-white "
              >
                <SunIcon className="w-6" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
