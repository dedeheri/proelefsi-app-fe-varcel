import { logo, logoLight } from "../../assets/image";
import { getAllCookies } from "../../utils/Cookie";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

function GridAdd({
  error,
  message,
  title,
  fetching,
  onClickBack,
  onClickSend,
  children,
}) {
  const cookie = getAllCookies();
  const { t } = useTranslation();

  if (error) {
    return (
      <div className={cookie.theme === "dark" ? "dark" : "light"}>
        <div className=" bg-white dark:bg-black text-black dark:text-white w-full h-full min-h-screen flex justify-center items-center">
          <h1 className="text-2xl font-medium">{message}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={cookie.theme === "dark" ? "dark" : "light"}>
      <div className=" bg-white dark:bg-black text-black dark:text-white w-full h-full min-h-screen">
        <div className="w-full">
          <Toaster position="top-center" reverseOrder={false} />
          <Helmet>
            <title>{title} - proelefsi</title>
          </Helmet>

          {/* navbar */}
          <div className="h-16 w-full sticky top-0 border-b dark:border-[#353535] flex items-center px-6 justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onClickBack}
                className="hover:bg-gray-200 dark:hover:bg-[#353535] text-gray-500 hover:text-black p-1 rounded-full dark:text-gray-500 dark:hover:text-white duration-300 "
              >
                <ChevronLeftIcon className="w-7 md:w-8" />
              </button>

              {/* image */}
              {cookie.theme === "dark" ? (
                <img src={logoLight} className="w-28 md:w-32" alt="logo" />
              ) : (
                <img src={logo} className="w-28 md:w-32" alt="logo" />
              )}
            </div>
            <div>
              {fetching ? (
                <div className="bg-[#0B5AC6]  cursor-wait flex items-center justify-center duration-300 text-white h-9  px-8 md:px-10 rounded-md">
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
                  onClick={onClickSend}
                  className="bg-[#2374e1] hover:bg-[#3385f0] duration-300 px-10 md:px-14 text-white h-9  rounded-md flex space-x-2 items-center"
                >
                  <h1 className="font-medium text-lg">{t("AUTH.SEND")}</h1>
                </button>
              )}
            </div>
          </div>
          <div className="bg-[#353535] h-full min-h-screen">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default GridAdd;
