import { useRef, useState } from "react";

// components
import { useTranslation } from "react-i18next";
import {
  Input,
  Image,
  ListBoxAdd,
  Checkbox,
  Editor,
  GridAddArticle,
} from "../../../components";
import { useDispatch, useSelector } from "react-redux";
import { addArticeAction } from "../../../constants/action/dashboard/article.action";

function AddArticle() {
  const { t } = useTranslation();
  const instanceRef = useRef(null);
  const dispatch = useDispatch();
  const { add } = useSelector((state) => state.article);

  const [topicsSelected, setTopicsSelected] = useState([]);
  const [addArticleState, setAddArticleState] = useState({
    image_url: "",
    image_url_priview: "",
    title: "",
    content: "",
    topics: [],
    tags: "",
    subTitle: "",
    draft: false,
  });
  const [columns, setColumns] = useState(false);
  const [subTitle, setSubTitle] = useState(false);

  function handleOnChange(e) {
    setAddArticleState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }
  function handleDraft(e) {
    setAddArticleState((prev) => ({
      ...prev,
      draft: e.target.checked,
    }));
  }

  async function handleAddArticle(e) {
    e.preventDefault();
    const savedData = await instanceRef.current.save();

    const formData = new FormData();
    formData.append("image_url", addArticleState.image_url);
    formData.append("title", addArticleState.title);
    formData.append("sub_title", addArticleState.subTitle);
    formData.append("topics", topicsSelected?.topics);

    addArticleState.tags.split(",").map((_) => {
      formData.append("tags", _);
    });
    formData.append("draft", addArticleState.draft);
    formData.append("content", JSON.stringify(savedData));

    dispatch(addArticeAction(formData));
  }

  return (
    <GridAddArticle
      setColumns={setColumns}
      columns={columns}
      fetching={add?.fetching}
      onClickAddArticle={handleAddArticle}
    >
      <div className="flex px-4">
        {/* content */}
        <div className="  w-[70rem] mt-10 pt-3  mx-auto space-y-5  duration-300 ">
          <Editor instanceRef={instanceRef} />
        </div>
        {/* columns */}
        <div
          className={`w-80 z-50 overflow-y-auto scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-thin pb-20 bg-white dark:bg-black space-y-3 duration-300 right-0 h-full min-h-screen border-l pt-8 fixed dark:border-[#353535] ${
            columns ? "translate-x-0 " : "translate-x-full "
          }`}
        >
          {/* draft */}
          <div className="space-y-2 py1 px-5">
            <Checkbox
              label={t("ARTICLE.ADD.DRAFT")}
              onChange={handleDraft}
              defaultValue={addArticleState.draft}
            />
          </div>
          <div className="border-b dark:border-[#353535]" />
          {/* image */}
          <div className="space-y-2 py1 px-5">
            <h1 className="text-md font-medium">{t("ARTICLE.ADD.IMAGE")}</h1>
            <Image
              state={setAddArticleState}
              error={add?.form_validation?.image_url?.message}
              preview={addArticleState.image_url_priview}
              label={t("ARTICLE.ADD.IMAGE")}
            />
          </div>
          <div className="border-b dark:border-[#353535]" />
          {/* title */}
          <div className="space-y-2 py1 px-5">
            <h1 className="text-md font-medium">{t("ARTICLE.ADD.TITLE")}</h1>
            <Input
              error={add?.form_validation?.title?.message}
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
                error={addArticleState.message.validation?.title?.message}
                placeholder={t("ARTICLE.ADD.SUBTITLE")}
                onChange={handleOnChange}
                name="subTitle"
              />
            )}
          </div>
          <div className="border-b dark:border-[#353535]" />
          {/* topics */}
          <div className="space-y-2 py1 px-5">
            <h1 className="text-md font-medium">{t("ARTICLE.ADD.TOPICS")}</h1>
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
              placeholder={t("ARTICLE.ADD.TAGS")}
              onChange={handleOnChange}
              name="tags"
            />
            <h1 className="text-sm italic text-gray-500">
              {t("ARTICLE.ADD.TAGS_CAPTION")}
            </h1>
          </div>
          <div className="border-b dark:border-[#353535]" />
        </div>
      </div>
    </GridAddArticle>
  );
}

export default AddArticle;
