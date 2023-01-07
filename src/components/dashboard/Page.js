import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";

import query from "query-string";
import Cookies from "js-cookie";

function Page({ page, cookieName, perPage }) {
  const { t } = useTranslation();
  const navigte = useNavigate();
  const location = useLocation();

  const queryParams = query.parse(location.search);

  function handlePerPage(value) {
    Cookies.set(cookieName, value);
    perPage(value);
  }

  function nextPage(value) {
    navigte({
      search: `${createSearchParams({
        ...queryParams,
        page: value,
      })}`,
    });
  }

  const valuePage = [5, 10, 15, 20];

  return (
    <div className="flex px-5 md:px-10 lg:px-16 py-3 border-b dark:border-[#353535] space-x-6 justify-end items-center">
      <h1 className="text-md font-normal dark:text-gray-400 text-gray-500">
        {t("ARTICLE.PAGE.ROWS")}
      </h1>

      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="inline-flex w-full space-x-2 dark:text-gray-400 text-gray-500">
          <h1 className="text-md font-normal">{page?.perPage}</h1>
          <ChevronDownIcon className="w-6" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute bottom-8 -left-2 w-16 rounded-md bg-white dark:bg-black border dark:border-[#353535] flex space-y-2 flex-col justify-center items-center py-3">
            {valuePage.map((v, i) => (
              <h1
                key={i}
                onClick={() => handlePerPage(v)}
                className="font-medium cursor-pointer"
              >
                {v}
              </h1>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>

      <div className="flex space-x-2">
        <h1 className="text-md font-normal">{page?.from}</h1>
        <h1 className="text-md font-normal">-</h1>
        <h1 className="text-md font-normal">{page?.to}</h1>
      </div>

      <div className="flex space-x-2">
        <button
          className={
            page?.previous?.page
              ? "dark:text-white text-black"
              : "dark:text-gray-400 text-gray-600 cursor-not-allowed"
          }
          onClick={() =>
            page?.previous?.page ? nextPage(page.previous.page) : null
          }
        >
          <ChevronLeftIcon className="w-5" />
        </button>
        <button
          className={
            page?.next?.page
              ? "dark:text-white text-black"
              : "dark:text-gray-400 text-gray-600 cursor-not-allowed"
          }
          onClick={() => (page?.next?.page ? nextPage(page.next.page) : null)}
        >
          <ChevronRightIcon className="w-5" />
        </button>
      </div>
    </div>
  );
}

export default Page;
