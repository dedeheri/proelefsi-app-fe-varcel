import { Fragment, useEffect } from "react";

import {
  AdjustmentsVerticalIcon,
  BarsArrowDownIcon,
  BarsArrowUpIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { Popover, Tab, Transition } from "@headlessui/react";

import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import query from "query-string";
import { useDispatch, useSelector } from "react-redux";
import { getRole } from "../../constants/action";

// active class name
const activeStateNavLink =
  "flex items-center space-x-2 border-b-[0.2rem] border-[#2374e1] px-2 pt-3 pb-1";
const unActiveStateNavLink =
  "flex items-center space-x-2 border-b-[0.2rem] border-transparent px-2 pt-3 pb-1";

function FilterUser() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const { data, error, loading, message } = useSelector((state) => state.role);

  useEffect(() => {
    dispatch(getRole());
  }, [dispatch]);

  const queryParams = query.parse(location.search);

  function handleQueryBaseOn(key, value) {
    navigate({
      search: `${createSearchParams({
        ...queryParams,
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
          <div className="overflow-hidden shadow-lg bg-white dark:bg-[#19191a] rounded-lg border dark:border-[#353535]">
            {/* tab */}
            <Tab.Group>
              <Tab.List className="flex space-x-4 border-b dark:border-[#353535] px-2">
                <Tab
                  className={({ selected }) =>
                    selected ? activeStateNavLink : unActiveStateNavLink
                  }
                >
                  <h1 className="font-medium text-md md:text-lg">
                    {t("USER.TABLE.ROLE")}
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
                  {/* Role */}

                  <div className="flex flex-col py-3 space-y-1">
                    {loading ? (
                      <div className="space-y-3 animate-pulse px-4 py-1">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="bg-gray-200 dark:bg-[#353535] h-8 rounded-md"
                          />
                        ))}
                      </div>
                    ) : error ? (
                      <h1 className="font-medium text-md md:text-lg p-5 text-red-500">
                        {message}
                      </h1>
                    ) : (
                      <>
                        {data?.map((role, index) => (
                          <div
                            key={index}
                            onClick={() => handleQueryBaseOn("role", role.body)}
                            className="flex cursor-pointer items-center space-x-2 px-4 py-1 hover:bg-gray-100 hover:dark:bg-[#363535] rounded-md"
                          >
                            <h1 className="text-md md:text-lg">{role.role}</h1>
                          </div>
                        ))}
                        <div className="border-b dark:border-[#353535]" />

                        <div
                          onClick={() => handleQueryBaseOn("role", "")}
                          className="flex cursor-pointer items-center space-x-2 px-4 py-1 hover:bg-gray-100 hover:dark:bg-[#363535] rounded-md"
                        >
                          <h1 className="text-md md:text-lg">
                            {t("USER.ROLE.ALL")}
                          </h1>
                        </div>
                      </>
                    )}
                  </div>
                </Tab.Panel>

                <Tab.Panel>
                  <div className="flex flex-col py-4 space-y-1">
                    <div
                      onClick={() => handleQueryBaseOn("sort", -1)}
                      className="flex cursor-pointer items-center space-x-2 px-4 py-1 hover:bg-gray-100 hover:dark:bg-[#363535] rounded-md"
                    >
                      <BarsArrowUpIcon className="w-8 bg-blue-200 dark:bg-blue-500 p-1 rounded-md" />
                      <h1 className="font-medium text-md md:text-lg">
                        {t("ARTICLE.FILTER_TEXT.LATEST")}
                      </h1>
                    </div>
                    <div
                      onClick={() => handleQueryBaseOn("sort", 1)}
                      className="flex cursor-pointer items-center space-x-2 px-4 py-1 hover:bg-gray-100 hover:dark:bg-[#363535] rounded-md"
                    >
                      <BarsArrowDownIcon className="w-8 bg-yellow-200 dark:bg-yellow-500 p-1 rounded-md" />
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

export default FilterUser;
