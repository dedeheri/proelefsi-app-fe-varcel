import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logo, logoLight } from "../../../assets/image";
import { userConfigAction } from "../../../constants/action/dashboard/user.action";
import { getAllCookies } from "../../../utils/Cookie";

function GridAddArticle({
  fetching,
  onClickColumns,
  setColumns,
  columns,
  onClickAddArticle,
  children,
}) {
  const dispatch = useDispatch();
  const cookie = getAllCookies();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // calling api
  useEffect(() => {
    dispatch(userConfigAction());
  }, [dispatch]);

  function onClickColumns() {
    setColumns((prev) => !prev);
  }

  return (
    <div className={cookie.theme === "dark" ? "dark" : "light"}>
      <div className="bg-white dark:bg-black text-black dark:text-white w-full h-full min-h-screen ">
        <div className="w-full">
          <Toaster position="top-center" reverseOrder={false} />
          <Helmet>
            <title>{t("ARTICLE.ADD_ARTICLE")} - proelefsi</title>
          </Helmet>
          {/* navbar */}
          <div className="h-14 w-full border-b dark:border-[#353535]  sticky top-0  z-40  bg-white dark:bg-black flex items-center px-2 md:px-4 lg:px-6 justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate("/dashboard/article")}
                className="text-gray-500 hover:text-black p-2 rounded-full dark:text-gray-500 dark:hover:text-white duration-300  hover:bg-gray-100 dark:hover:bg-[#353535]"
              >
                <ChevronLeftIcon className="w-6 md:w-7" />
              </button>

              {/* image */}
              {cookie.theme === "dark" ? (
                <img src={logoLight} className="w-28 md:w-32" alt="logo" />
              ) : (
                <img src={logo} className="w-28 md:w-32" alt="logo" />
              )}
            </div>
            <div className="flex space-x-2 items-center">
              {fetching ? (
                <div className="bg-[#0B5AC6]  cursor-wait flex items-center justify-center duration-300 text-white  h-9   rounded-md md:w-[10rem] w-[8rem]">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <h1 className="font-medium text-md">Loading</h1>
                </div>
              ) : (
                <button
                  onClick={onClickAddArticle}
                  className="bg-[#2374e1] hover:bg-[#3385f0] duration-300  text-white h-9  rounded-md flex justify-center space-x-2 items-center md:w-[10rem] w-[8rem]"
                >
                  <h1 className="font-medium text-lg">{t("AUTH.SEND")}</h1>
                </button>
              )}
              <button
                onClick={onClickColumns}
                className="text-gray-500 hover:text-black p-2 rounded-full dark:text-gray-500 dark:hover:text-white duration-300 hover:bg-gray-100 dark:hover:bg-[#353535]"
              >
                {columns ? (
                  <svg
                    className="w-6 h-6 "
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-6 h-6 1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* children */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default GridAddArticle;
