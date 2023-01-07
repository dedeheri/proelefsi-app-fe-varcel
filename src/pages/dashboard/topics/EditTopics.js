import React, { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { requestDetailTopics, requestEditTopics } from "../../../action/topics";

import { Input } from "../../../components";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { getAllCookies } from "../../../utils/Cookie";
import { logo, logoLight } from "../../../assets/image";

function EditTopics() {
  const cookie = getAllCookies();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();

  const [detailTopics, setDetailTopics] = useState({
    loading: true,
    error: false,
    success: false,
    message: "",
    data: "",
  });

  const [editTopics, setEditTopics] = useState({
    fetching: false,
    error: false,
    success: false,
    message: {
      validation: {},
      message: "",
    },
    topics: "",
    description: "",
  });

  function handleInput(e) {
    setEditTopics((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  useEffect(() => {
    requestDetailTopics(setDetailTopics, id);
  }, [id]);

  useEffect(() => {
    setEditTopics((prev) => ({
      ...prev,
      description: detailTopics?.data?.description,
      topics: detailTopics?.data?.topics,
    }));
  }, [detailTopics]);

  async function handleEditTopics(e) {
    e.preventDefault();
    requestEditTopics(
      setEditTopics,
      id,
      editTopics.topics,
      editTopics.description
    );
  }

  return (
    <div className=" bg-white dark:bg-black text-black dark:text-white w-full h-full min-h-screen">
      <div className="w-full">
        <Toaster position="top-center" reverseOrder={false} />
        <Helmet>
          <title>{t("TOPICS.ADD.TOPICS")} - proelefsi</title>
        </Helmet>

        {/* navbar */}
        <div className="h-16 w-full border-b dark:border-[#353535] flex items-center px-6 justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/dashboard/topics")}
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
          <div className="flex space-x-2 items-center">
            {editTopics.fetching ? (
              <div className="bg-[#0B5AC6] px-5 cursor-wait flex items-center justify-center duration-300 text-white  h-9  w-full rounded-md">
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
                onClick={handleEditTopics}
                className="bg-[#2374e1] hover:bg-[#3385f0] duration-300 px-10 md:px-14 text-white h-9  rounded-md flex space-x-2 items-center"
              >
                <h1 className="font-medium text-lg">{t("AUTH.SEND")}</h1>
              </button>
            )}
          </div>
        </div>

        <div className="w-full pt-10 p-4 md:w-[26rem] lg:w-[40rem] mx-auto space-y-3">
          {/* topics */}
          <div className="space-y-2">
            <h1 className="text-lg font-medium">{t("TOPICS.ADD.TOPICS")}</h1>
            <Input
              value={editTopics.topics || " "}
              error={
                editTopics?.message?.validation?.topics?.message ||
                editTopics?.message?.message
              }
              placeholder={t("TOPICS.ADD.TOPICS")}
              name={"topics"}
              onChange={handleInput}
            />
          </div>
          {/* description */}
          <div className="space-y-2">
            <h1 className="text-lg font-medium">
              {t("TOPICS.ADD.DESCRIPTION")}{" "}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({t("TOPICS.ADD.OPTIONAL")})
              </span>
            </h1>
            <Input
              value={editTopics.description || " "}
              placeholder={t("TOPICS.ADD.DESCRIPTION")}
              name="description"
              onChange={handleInput}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditTopics;
