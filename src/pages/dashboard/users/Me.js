import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  HeaderMe,
  ManageTopics,
  SkeletonHeaderProfile,
} from "../../../components";
import { getUser } from "../../../constants/action";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { requestGetArticleUserPublished } from "../../../action/user";
function Me() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.profileUser);

  const { id } = useParams();

  const [article, setArticle] = useState({
    loading: true,
    success: false,
    error: false,
    message: "",
    data: {},
  });

  useEffect(() => {
    requestGetArticleUserPublished(setArticle, id);
  }, [id]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  console.log(article);

  return (
    <Container title={data.fullname}>
      {/* header */}
      {loading ? (
        <SkeletonHeaderProfile />
      ) : (
        <HeaderMe />

        //   end
      )}
      <div
        className="lg:flex w-full md:py-14 md:px-28 py-7 px-10  lg:space-x-9 space-y-9
          lg:space-y-0"
      >
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

export default Me;
