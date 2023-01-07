import {
  AdjustmentsVerticalIcon,
  ArchiveBoxIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { Popover, Tab, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { requestTopics } from "../../action/topics";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import query from "query-string";

// active class name
const activeStateNavLink =
  "flex items-center space-x-2 border-b-[0.2rem] border-[#2374e1] px-2 pt-3 pb-1";
const unActiveStateNavLink =
  "flex items-center space-x-2 border-b-[0.2rem] border-transparent px-2 pt-3 pb-1";

function FilterArticle() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // state
  const [resultSearchTerm, setResultSearchTerm] = useState("");
  const [topics, setTopics] = useState({
    loading: true,
    error: false,
    success: false,
    message: "",
    data: {
      topics: [],
    },
  });

  // calling api topics
  useEffect(() => {
    requestTopics(setTopics, `?search=${resultSearchTerm}`);
  }, [resultSearchTerm]);

  const queryParsed = query.parse(location.search);

  function handleQueryBaseOn(key, value) {
    navigate({
      search: `${createSearchParams({
        ...queryParsed,
        [key]: value,
      })}`,
    });
  }

  return (
    <Popover className="relative">
      <Popover.Button>
        <div className="cursor-pointer text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white duration-300  md:rounded-md md:flex md:space-x-2 md:items-center md:bg-gray-100 hover:md:bg-gray-200 dark:md:bg-[#242323] dark:md:hover:bg-[#333333] md:text-black dark:md:text-white md:px-3 md:py-1">
          <AdjustmentsVerticalIcon className="w-6 md:w-5" />
          <h1 className="font-medium text-lg hidden md:block">
            {t("ARTICLE.FILTER")}
          </h1>
        </div>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-500"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-0 rounded-md z-10 mt-2 w-72 md:w-80">
          <div className="overflow-hidden shadow-sm bg-white dark:bg-[#19191a] rounded-lg border dark:border-[#353535]">
            {/* tab */}
            <Tab.Group>
              <Tab.List className="flex space-x-4 border-b dark:border-[#353535] px-2">
                <Tab
                  className={({ selected }) =>
                    selected ? activeStateNavLink : unActiveStateNavLink
                  }
                >
                  <h1 className="font-medium text-md md:text-lg">
                    {t("ARTICLE.TOPICS")}
                  </h1>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    selected ? activeStateNavLink : unActiveStateNavLink
                  }
                >
                  <h1 className="font-medium text-md md:text-lg">
                    {t("ARTICLE.BASEDON")}
                  </h1>
                </Tab>
              </Tab.List>

              {/* search */}
              <Tab.Panels>
                <Tab.Panel>
                  <div className="space-y-2">
                    {/* search */}
                    <div className="w-full flex px-3 py-1 border-b dark:border-[#353535]">
                      <MagnifyingGlassIcon className="w-5 md:w-6 " />
                      <input
                        autoFocus={true}
                        className="h-10 w-full bg-transparent outline-none px-2 placeholder:font-medium text-md md:text-lg"
                        placeholder={t("ARTICLE.SEARCH")}
                        onChange={(e) => setResultSearchTerm(e.target.value)}
                      />
                    </div>
                    {/* topics */}
                    <div className="h-44 md:h-52 overflow-y-auto scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-thin px-2">
                      {topics.loading ? (
                        <div className="space-y-3 animate-pulse pr-4">
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className="bg-gray-200 dark:bg-[#353535] h-8 rounded-md"
                            />
                          ))}
                        </div>
                      ) : topics.error ? (
                        <h1 className="font-medium text-lg md:text-xl h-44 flex justify-center items-center text-gray-500">
                          {topics.message}
                        </h1>
                      ) : (
                        topics.data.topics.map((t, i) => (
                          <div
                            key={i}
                            className="px-2 py-1 hover:bg-gray-100 hover:dark:bg-[#363535] rounded-md duration-200 cursor-pointer"
                          >
                            <div
                              onClick={() =>
                                handleQueryBaseOn("topics", t.topics)
                              }
                            >
                              <h1 className="whitespace-nowrap font-medium text-md md:text-lg">
                                {t.topics.length > 27
                                  ? t.topics.substring(0, 27) + "..."
                                  : t.topics}
                              </h1>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </Tab.Panel>

                {/* base on */}

                <Tab.Panel>
                  <div className="flex flex-col p-2 py-4 space-y-1">
                    <div
                      onClick={() => handleQueryBaseOn("draft", false)}
                      className="flex cursor-pointer items-center space-x-4 px-2 py-1 hover:bg-gray-100 hover:dark:bg-[#3A3B3C] rounded-md"
                    >
                      <PaperAirplaneIcon className="w-9 bg-gray-200 dark:bg-[#4E4F50] p-2 rounded-full" />
                      <h1 className="font-medium text-md md:text-lg">
                        {t("ARTICLE.PUBLISH")}
                      </h1>
                    </div>
                    <div
                      onClick={() => handleQueryBaseOn("draft", true)}
                      className="flex cursor-pointer items-center space-x-4 px-2 py-1 hover:bg-gray-100 hover:dark:bg-[#363535] rounded-md"
                    >
                      <ArchiveBoxIcon className="w-9 bg-gray-200 dark:bg-[#4E4F50] p-2 rounded-full" />
                      <h1 className="font-medium text-md md:text-lg">
                        {t("ARTICLE.DRAFT")}
                      </h1>
                    </div>

                    <div className="border-b dark:border-[#353535]" />
                    <div
                      onClick={() => handleQueryBaseOn("view", "viewed")}
                      className="flex cursor-pointer items-center space-x-4 px-2 py-1 hover:bg-gray-100 hover:dark:bg-[#363535] rounded-md"
                    >
                      <EyeIcon className="w-9 bg-gray-200 dark:bg-[#4E4F50] p-2 rounded-full" />
                      <h1 className="font-medium text-md md:text-lg">
                        {t("ARTICLE.FILTER_TEXT.VIEW")}
                      </h1>
                    </div>
                    <div
                      onClick={() => handleQueryBaseOn("sort", -1)}
                      className="flex cursor-pointer items-center space-x-4 px-2 py-1 hover:bg-gray-100 hover:dark:bg-[#363535] rounded-md"
                    >
                      <BarsArrowUpIcon className="w-9 bg-gray-200 dark:bg-[#4E4F50] p-2 rounded-full" />
                      <h1 className="font-medium text-md md:text-lg">
                        {t("ARTICLE.FILTER_TEXT.LATEST")}
                      </h1>
                    </div>
                    <div
                      onClick={() => handleQueryBaseOn("sort", 1)}
                      className="flex cursor-pointer items-center space-x-4 px-2 py-1 hover:bg-gray-100 hover:dark:bg-[#363535] rounded-md"
                    >
                      <BarsArrowDownIcon className="w-9 bg-gray-200 dark:bg-[#4E4F50] p-2 rounded-full" />
                      <h1 className="font-medium text-md md:text-lg">
                        {t("ARTICLE.FILTER_TEXT.OLDEST")}
                      </h1>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default FilterArticle;
