import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { getAllCookies } from "../../../utils/Cookie";
import { Link, useLocation } from "react-router-dom";

// action
import { requestTopics } from "../../../action/topics";

// components
import {
  Container,
  FilterCategory,
  Page,
  Search,
  SkeletonTableCategory,
  TableCategory,
} from "../../../components";
import DeleteTopics from "./DeleteTopics";

function GetTopics() {
  // utils
  const { t } = useTranslation();
  const cookie = getAllCookies();
  const { search } = useLocation();

  // state
  const [perPage, setPerPage] = useState(0);
  const [topics, setTopics] = useState({
    loading: true,
    error: false,
    success: false,
    message: "",
    data: {
      topics: [],
      page: {},
    },
  });
  const [modalDelete, setModalDelete] = useState({
    show: false,
    id: "",
    title: "",
  });

  function handleDeleteTopics(id, title) {
    setModalDelete({
      show: true,
      title: title,
      id: id,
    });
  }

  useEffect(() => {
    requestTopics(setTopics, search);
  }, [search, cookie.i18next, perPage]);

  console.log(topics);

  return (
    <Container title={t("TOPICS.COLOUMN_NAME.TOPICS")}>
      {/* header */}
      <div className="px-5 md:px-7 pt-4 md:pt-6 lg:pt-8 pb-3 md:pb-2 lg:pb-7">
        <h1 className="font-medium text-3xl ">
          {t("TOPICS.COLOUMN_NAME.TOPICS")}
        </h1>
      </div>
      {/* header state */}
      <div className="border-b dark:border-[#353535] px-4 flex items-center justify-between">
        <div className="flex space-x-4 items-center my-2">
          {/* filter */}
          <FilterCategory />
          {/* search */}
          <Search />
        </div>

        {/* router add */}
        <Link
          to={"add"}
          className="bg-[#2374e1] hover:bg-[#3385f0] duration-300 px-3 text-white py-1 rounded-md flex space-x-2 items-center"
        >
          <PlusIcon className="w-6" />
          <h1 className="font-medium text-lg">{t("TOPICS.ADD_TOPICS")}</h1>
        </Link>
      </div>

      {/* table */}
      {topics.loading ? (
        <SkeletonTableCategory />
      ) : topics.error ? (
        <div className="py-10 border-b dark:border-[#3A3B3C]">
          <h1 className="flex justify-center font-medium text-xl text-gray-400 dark:text-gray-600">
            {topics.message}
          </h1>
        </div>
      ) : (
        <>
          <TableCategory topics={topics} onClickDelete={handleDeleteTopics} />
          <Page
            page={topics.data.page}
            cookieName={"ppc"}
            perPage={setPerPage}
          />

          <DeleteTopics
            open={modalDelete.show}
            close={setModalDelete}
            title={modalDelete.title}
            id={modalDelete.id}
          />
        </>
      )}
    </Container>
  );
}

export default GetTopics;
