import { Ring } from "@uiball/loaders";

import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Input,
  Image,
  ListBoxAdd,
  Editor,
  GridAddArticle,
  NotFound,
} from "../../../components";
import {
  detailArticleAction,
  editArticleAction,
} from "../../../constants/action/dashboard/article.action";

function EditArticle() {
  const { t } = useTranslation();
  const { id } = useParams();
  const instanceRef = useRef(null);

  const dispatch = useDispatch();
  const { detail: details, edit: edits } = useSelector(
    (state) => state.article
  );

  // state
  const [columns, setColumns] = useState(false);
  const [editArticleState, setEditArticleState] = useState({
    image_url: "",
    image_url_priview: "",
    title: "",
    content: {},
    topics: [],
    tags: [],
    subTitle: "",
    reference: [],
    draft: false,
  });
  const [topicsSelected, setTopicsSelected] = useState([]);
  const [subTitle, setSubTitle] = useState(false);

  useEffect(() => {
    setEditArticleState((prev) => ({
      ...prev,
      title: details?.result?.title,
      draft: details?.result?.draft,
      image_url: details?.result?.image_url,
      sub_title: details?.result?.sub_title,
      image_url_priview: details?.result?.image_url,
      tags: details?.result?.tags,
      content: details?.result?.content,
    }));

    setTopicsSelected(details?.result);
  }, [details]);

  function handleOnChange(e) {
    setEditArticleState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleEditArticle() {
    const savedData = await instanceRef.current.save();
    console.log(savedData);
    const formData = new FormData();
    formData.append("image_url", editArticleState.image_url);
    formData.append("title", editArticleState.title);
    formData.append("sub_title", editArticleState.subTitle);
    formData.append("topics", topicsSelected?.topics);
    formData.append("tags", editArticleState.tags);
    formData.append("content", JSON.stringify(savedData));
    dispatch(editArticleAction(id, formData));
  }

  useEffect(() => {
    dispatch(detailArticleAction(id));
  }, [dispatch, id]);

  return (
    <GridAddArticle
      setColumns={setColumns}
      columns={columns}
      onClickAddArticle={handleEditArticle}
      fetching={edits.fetching}
    >
      {details.error ? (
        <NotFound message={details.message} />
      ) : (
        !details.error && (
          <div className="flex px-4">
            {/* content */}
            <div className="md:w-[46rem] lg:w-[63rem] w-full mx-auto space-y-5 pt-8 duration-300">
              {editArticleState.content === undefined ? (
                <div className="mt-28 flex justify-center items-center">
                  <Ring size={43} speed={1} color="#2374e1" />
                </div>
              ) : (
                <Editor
                  id={id}
                  value={editArticleState.content}
                  instanceRef={instanceRef}
                />
              )}
            </div>
            {/* columns */}
            <div
              className={`w-80  z-50 overflow-y-auto scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-thin pb-20 bg-white dark:bg-black space-y-3 duration-300 right-0 h-full min-h-screen border-l pt-8 fixed dark:border-[#353535] ${
                columns ? "translate-x-0 " : "translate-x-full "
              }`}
            >
              {/* image */}
              <div className="space-y-2 py1 px-5">
                <h1 className="text-md font-medium">
                  {t("ARTICLE.ADD.IMAGE")}
                </h1>
                <Image
                  error={edits?.form_validation?.image_url?.message}
                  preview={editArticleState.image_url_priview}
                  state={setEditArticleState}
                  label={t("ARTICLE.ADD.IMAGE")}
                />
              </div>
              <div className="border-b dark:border-[#353535]" />
              {/* title */}
              <div className="space-y-2 py1 px-5">
                <h1 className="text-md font-medium">
                  {t("ARTICLE.ADD.TITLE")}
                </h1>
                <Input
                  value={editArticleState.title || ""}
                  error={edits?.form_validation?.title?.message}
                  placeholder={t("ARTICLE.ADD.TITLE")}
                  onChange={handleOnChange}
                  name="title"
                />
                {!subTitle ? (
                  <button
                    onClick={() => setSubTitle(true)}
                    className="font-medium text-sm text-gray-500 hover:text-blue-700 cursor-pointer duration-300"
                  >
                    {t("ARTICLE.ADD.ADD_SUB_TITLE")}
                  </button>
                ) : (
                  <button
                    onClick={() => setSubTitle(false)}
                    className="font-medium text-sm text-gray-500 hover:text-blue-700 cursor-pointer duration-300"
                  >
                    {t("ARTICLE.ADD.DELETE_SUB_TITLE")}
                  </button>
                )}
                {subTitle && (
                  <Input
                    value={editArticleState.sub_title || ""}
                    placeholder={t("ARTICLE.ADD.SUBTITLE")}
                    onChange={handleOnChange}
                    name="subTitle"
                  />
                )}
              </div>
              <div className="border-b dark:border-[#353535]" />
              {/* topics */}
              <div className="space-y-2 py1 px-5">
                <h1 className="text-md font-medium">
                  {t("ARTICLE.ADD.TOPICS")}
                </h1>

                <ListBoxAdd
                  topicsSelected={topicsSelected}
                  setTopicsSelected={setTopicsSelected}
                />
              </div>
              <div className="border-b dark:border-[#353535]" />
              {/* tags */}
              <div className="space-y-2 py1 px-5">
                <h1 className="text-md font-medium">{t("ARTICLE.ADD.TAGS")}</h1>
                <Input
                  value={editArticleState.tags || ""}
                  placeholder={t("ARTICLE.ADD.TAGS")}
                  onChange={handleOnChange}
                  name="tags"
                />
                <h1 className="text-sm italic text-gray-500">
                  Pisahkan dengan koma
                </h1>
              </div>
              <div className="border-b dark:border-[#353535]" />
            </div>
          </div>
        )
      )}
    </GridAddArticle>
  );
}

export default EditArticle;
