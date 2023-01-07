import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { SkeletonManageTopics } from "..";
import { requestManageTopicsUser } from "../../action/user";
import query from "query-string";
import { useTranslation } from "react-i18next";

function ManageTopics() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [manageTopics, setManageTopics] = useState({
    loading: true,
    success: false,
    error: false,
    message: "",
    data: "",
  });

  useEffect(() => {
    requestManageTopicsUser(setManageTopics, id);
  }, [id]);

  const location = useLocation();
  const navigate = useNavigate();
  const queryParsed = query.parse(location.search);

  function queryTopics(value) {
    navigate({
      search: `${createSearchParams({
        ...queryParsed,
        topics: value,
      })}`,
    });
  }

  return manageTopics.loading ? (
    <SkeletonManageTopics />
  ) : (
    <div>
      <div className="border dark:border-[#3A3B3C] rounded-md w-full lg:w-72">
        <h1 className="font-medium text-md bg-gray-100 dark:bg-[#1F1F1F] py-2 px-5">
          {t("USER.MANAGE")}
        </h1>

        {manageTopics?.data?.manage?.map((data, index) => (
          <div
            className="py-1 px-5 cursor-pointer hover:bg-gray-100 duration-300 dark:hover:bg-[#1F1F1F]"
            key={index}
          >
            <div
              className="flex justify-between"
              onClick={() => queryTopics(data.topics)}
            >
              <h1 className="font-medium text-lg">{data.topics}</h1>
              <h1 className="font-medium text-lg">{data.count}</h1>
            </div>
          </div>
        ))}
        <div className="border-b dark:border-[#3A3B3C] pt-10" />
        <div className="flex justify-between py-1 px-5">
          <h1 className="font-medium text-lg">Total</h1>
          <h1 className="font-medium text-lg">{manageTopics.data.total}</h1>
        </div>
      </div>
    </div>
  );
}

export default ManageTopics;
