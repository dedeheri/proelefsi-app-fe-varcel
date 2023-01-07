import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { requestGetUserDetail } from "../../../action/user";
import {
  Container,
  HeaderProfile,
  ManageTopics,
  SkeletonHeaderProfile,
} from "../../../components";

import { useTranslation } from "react-i18next";

function DetailUser() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [user, setUser] = useState({
    loading: true,
    success: false,
    error: false,
    message: "",
    user: "",
  });

  useEffect(() => {
    requestGetUserDetail(setUser, id);
  }, [id]);

  return (
    <Container title={user.user.fullname}>
      {/* header */}
      {user.loading ? <SkeletonHeaderProfile /> : <HeaderProfile user={user} />}
      <div
        className="lg:flex w-full md:py-14 md:px-28 py-7 px-10  lg:space-x-9 space-y-9
        lg:space-y-0"
      >
        {/* manage */}
        <ManageTopics />
        {/* Tab */}
        <div className="space-y-5 w-full">
          <div className="border-b dark:border-[#3A3B3C] pb-2 space-x-6">
            <NavLink
              end={true}
              to={""}
              className={({ isActive }) =>
                isActive
                  ? "text-black dark:text-white border-b-2 pb-2 border-[#2374e1] font-medium text-lg md:text-xl"
                  : "dark:text-gray-600 text-gray-500 font-medium text-lg md:text-xl hover:text-black  dark:hover:text-white duration-300 border-b-2 border-transparent pb-2"
              }
            >
              {t("ARTICLE.PUBLISH")}
            </NavLink>
            <NavLink
              to={"draft"}
              className={({ isActive }) =>
                isActive
                  ? "text-black dark:text-white border-b-2 pb-2 border-[#2374e1] font-medium text-lg md:text-xl"
                  : "dark:text-gray-600 text-gray-500 font-medium text-lg md:text-xl hover:text-black  dark:hover:text-white duration-300 border-b-2 border-transparent pb-2"
              }
            >
              {t("ARTICLE.DRAFT")}
            </NavLink>
          </div>
          <Outlet />
        </div>
      </div>
    </Container>
  );
}

export default DetailUser;
