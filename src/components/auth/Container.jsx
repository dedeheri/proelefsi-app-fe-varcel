import React from "react";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { logo, logoLight } from "../../assets/image";
import { getAllCookies } from "../../utils/Cookie";
import Footer from "./Footer";

function Container({ onSubmit, children, title }) {
  const cookie = getAllCookies();
  const {t} = useTranslation()

  return (
    <div className={cookie.theme === "dark" ? "dark" : "light"}>
      <div className=" bg-white dark:bg-black text-black dark:text-white w-full h-full min-h-screen">

        <Helmet>
        <title>{t(title)} - proelefsi</title>
        </Helmet>


        <Toaster position="top-center" reverseOrder={false} />
        <div
          className="flex flex-col items-center justify-center pt-16 space-y-10 py-10 "
        >
          {/* image */}
          {cookie.theme === "dark" ? (
            <img src={logoLight} className="md:w-72 w-60" alt="logo" />
          ) : (
            <img src={logo} className="md:w-72 w-60" alt="logo" />
          )}

          {/* card */}
          <div className="border dark:border-[#353535] dark:bg-[#18191a] bg-white rounded-xl space-y-4 w-[21rem] md:w-[22rem] xl:w-[26rem] px-10 py-8 md:px-14 md:py-12 lg:px-16 lg:py-14">
            {children}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Container;
