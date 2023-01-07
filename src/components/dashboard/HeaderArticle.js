import { PlusIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";

import Search from "./Search";
import FilterArticle from "./FilterArticle";

function HeaderArticle() {
  const { t } = useTranslation();

  const tabsActiveClassName =
    "text-[#2374e1] border-b-[0.2rem] border-[#2374e1] pb-1 px-1";
  const tabsNonActiveClassName =
    "dark:text-gray-600 text-gray-500 hover:text-[#2374e1] dark:hover:text-[#2374e1] duration-300 px-1";

  return (
    <div className="w-full">
      {/* header */}
      <div className=" px-5 md:px-7 pt-4 md:pt-6 lg:pt-8 pb-3 md:pb-2 lg:pb-7">
        <h1 className="font-medium text-xl md:text-2xl lg:text-3xl ">
          {t("ARTICLE.NAME")}
        </h1>
      </div>

      {/* header state */}
      <div className="border-b dark:border-[#353535] px-4 flex items-center justify-between">
        <div className="flex space-x-4 items-center my-2">
          {/* search */}
          <Search />
          {/* filter */}
          <FilterArticle />
        </div>

        {/* router add */}
        <Link
          to={"add"}
          className="md:bg-[#2374e1] md:hover:bg-[#3385f0] duration-300 px-3 md:text-white py-1 rounded-md flex space-x-2 items-center dark:md:text-white text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
        >
          <PlusIcon className="w-7 md:w-6" />
          <h1 className="font-medium text-lg hidden md:block">
            {t("ARTICLE.ADD_ARTICLE")}
          </h1>
        </Link>
      </div>
    </div>
  );
}

export default HeaderArticle;
