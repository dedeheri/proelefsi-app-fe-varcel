import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  Container,
  Search,
  TableArticle,
  SkeletonTableArticle,
  FilterArticle,
  Message,
} from "../../../components";
import { getArticleAction } from "../../../constants/action/dashboard";
import { getAllCookies } from "../../../utils/Cookie";
import DeleteArticle from "./DeleteArticle";

function GetArticle() {
  const { t } = useTranslation();
  const cookie = getAllCookies();
  const { search } = useLocation();
  const [perPage, setPerPage] = useState(0);
  const [change, setChange] = useState({
    message: "",
    error: "",
    fetching: false,
  });

  // redux
  const dispatch = useDispatch();
  const { data, loading, error, message, page } = useSelector(
    (state) => state.article
  );

  useEffect(() => {
    dispatch(getArticleAction(search));
  }, [dispatch, search, cookie.i18next, perPage, change]);

  return (
    <Container title={"TITLE.ARTICLE"}>
      <div className="w-full">
        {/* header */}
        <div className="px-5 md:px-7 pt-4 md:pt-6 lg:pt-8 pb-3 md:pb-2 lg:pb-7">
          <h1 className="font-medium text-xl md:text-2xl lg:text-3xl ">
            {t("ARTICLE.NAME")}
          </h1>
        </div>

        {/* header state */}
        <div className="border-b dark:border-[#353535] px-5 flex items-center justify-between">
          <div className="flex space-x-4 items-center my-2">
            {/* filter */}
            <FilterArticle />
            {/* search */}
            <Search />
          </div>

          {/* router add */}
          <Link
            to={"add"}
            className="md:bg-[#2374e1] md:hover:bg-[#3385f0] duration-300 px-3 md:text-white py-1 rounded-md flex space-x-2 items-center dark:md:text-white text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white md:hover:text-white"
          >
            <PlusIcon className="w-7 md:w-6" />
            <h1 className="font-medium text-lg hidden md:block">
              {t("ARTICLE.ADD_ARTICLE")}
            </h1>
          </Link>
        </div>
      </div>

      {loading ? (
        <SkeletonTableArticle />
      ) : error ? (
        <Message message={message} />
      ) : (
        <TableArticle
          data={data}
          setChange={setChange}
          page={page}
          perPage={setPerPage}
        />
      )}

      <DeleteArticle />
    </Container>
  );
}

export default GetArticle;
