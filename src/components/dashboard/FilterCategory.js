import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import query from "query-string";

function FilterCategory() {
  const { t } = useTranslation();
  const navigte = useNavigate();
  const location = useLocation();

  const queryParams = query.parse(location.search);
  function news(value) {
    navigte({
      search: `${createSearchParams({
        ...queryParams,
        sort: value,
      })}`,
    });
  }

  return (
    <Popover className="relative">
      <Popover.Button>
        <div className="duration-300 rounded-md flex space-x-2 items-center bg-gray-100 hover:bg-gray-200 dark:bg-[#242323] dark:hover:bg-[#333333] px-3 py-1">
          <AdjustmentsVerticalIcon className="w-5" />
          <h1 className="font-medium text-lg">{t("ARTICLE.FILTER")}</h1>
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
        <Popover.Panel className="absolute rounded-md z-10 mt-2 w-36 md:w-44">
          <div className="overflow-hidden shadow-lg bg-white dark:bg-black  rounded-lg border dark:border-[#353535] w-full">
            {/* tab */}
            <h1
              onClick={() => news(-1)}
              className="text-md font-medium hover:bg-gray-200 dark:hover:bg-[#353535] flex px-4 py-1 cursor-pointer duration-300"
            >
              Terbaru
            </h1>
            <h1
              onClick={() => news(1)}
              className="text-md font-medium hover:bg-gray-200 dark:hover:bg-[#353535] flex px-4 py-1 cursor-pointer duration-300"
            >
              Terlama
            </h1>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default FilterCategory;
