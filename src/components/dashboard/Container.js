import React, { useEffect } from "react";
import { getAllCookies } from "../../utils/Cookie";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import { t } from "i18next";
import { Toaster } from "react-hot-toast";
import SidebarMobile from "./SidebarMobile";
import ReactTooltip from "react-tooltip";

// redux
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../constants/action";
import Feedback from "./Feedback";
import { userConfigAction } from "../../constants/action/dashboard/user.action";

function Container({ title, childrenError, childrenMessage, children }) {
  const dispatch = useDispatch();
  const { error, message, data } = useSelector((state) => state.profileUser);

  const cookie = getAllCookies();

  // calling api
  useEffect(() => {
    dispatch(getUser());
    dispatch(userConfigAction());
  }, [dispatch]);

  if (error) {
    return (
      <div className={cookie.theme === "dark" ? "dark" : "light"}>
        <div className=" bg-white dark:bg-black text-black dark:text-white w-full h-full min-h-screen flex justify-center items-center">
          <h1 className="text-2xl font-medium">{message}</h1>
        </div>
      </div>
    );
  }

  if (childrenError) {
    return (
      <div className={cookie.theme === "dark" ? "dark" : "light"}>
        <div className=" bg-white dark:bg-black text-black dark:text-white w-full h-full min-h-screen flex justify-center items-center">
          <h1 className="text-2xl font-medium">{childrenMessage}</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={cookie.theme === "dark" ? "dark" : "light"}>
      <div className=" bg-white dark:bg-black text-black dark:text-white w-full h-full min-h-screen">
        <Helmet>
          <title>{t(title)} - proelefsi</title>
        </Helmet>
        <Toaster position="top-center" reverseOrder={false} />
        <ReactTooltip place="right" type="dark" effect="solid" />

        <div className="hidden md:block fixed">
          <Sidebar otoritas={data.role} />
        </div>

        <Navbar />
        <SidebarMobile otoritas={data.role} />
        <div className="flex">
          <div className="w-full mb-10 h-full duration-300 md:ml-16">
            {children}
          </div>
        </div>
      </div>

      {/* feedback */}

      <Feedback />
    </div>
  );
}

export default Container;
