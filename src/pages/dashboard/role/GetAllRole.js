import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  SkeletonTableCategory,
  TableRole,
} from "../../../components";
import { getRole } from "../../../constants/action";

function GetAllRole() {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { data, error, loading, message } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(getRole());
  }, [dispatch]);

  return (
    <Container title={t("TOPICS.COLOUMN_NAME.TOPICS")}>
      {/* header */}
      <div className="px-5 md:px-7 pt-4 md:pt-6 lg:pt-8 pb-3 md:pb-2 lg:pb-7">
        <h1 className="font-medium text-3xl ">
          {t("TOPICS.COLOUMN_NAME.TOPICS")}
        </h1>
      </div>
      {/* header state */}
      <div className="border-b dark:border-[#353535] px-4 flex items-center justify-end py-2">
        {/* router add */}
        <Link
          to={"add"}
          className="md:bg-[#2374e1] md:hover:bg-[#3385f0] duration-300 px-3 md:text-white rounded-md flex space-x-2 items-center dark:md:text-white text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white md:hover:text-white py-1"
        >
          <PlusIcon className="w-7 md:w-6" />
          <h1 className="font-medium text-lg hidden md:block">
            {t("ROLE.ADD_ROLE")}
          </h1>
        </Link>
      </div>

      {/* table */}
      {/* {topics.loading && <SkeletonTableCategory />}
      {topics.error && (
        <div className="py-10 border-b dark:border-[#3A3B3C]">
          <h1 className="flex justify-center font-medium text-xl text-gray-400 dark:text-gray-600">
            {topics.message}
          </h1>
        </div>
      )} */}
      <TableRole data={data} />
    </Container>
  );
}

export default GetAllRole;
