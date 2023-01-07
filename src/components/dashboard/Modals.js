import { useTranslation } from "react-i18next";
import { Button, Proccess } from "../../../components";

import { requestDeletedArticle } from "../../../action/article";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import query from "query-string";
import { useLocation, useNavigate } from "react-router-dom";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { getAllCookies } from "../../../utils/Cookie";

function Modals({ show }) {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParsed = query.parse(location.search);
  const cookie = getAllCookies();
  const navigate = useNavigate();

  function closeModal() {
    navigate(-1);
  }

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed right-0 left-0 top-40  overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full max-w-md transform rounded-2xl  text-left align-middle border shadow-xl transition-all  ${
                  cookie.theme === "dark"
                    ? "bg-black border-[#353535]"
                    : "bg-white"
                } `}
              >
                <div className="text-black p-9 dark:text-white space-y-5 md:space-y-6">
                  <ExclamationTriangleIcon className="w-36 text-red-600 mx-auto" />
                  <h1
                    className={`font-medium text-lg leading-6 text-center ${
                      cookie.theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    <span
                      className={`font-normal ${
                        cookie.theme === "dark"
                          ? "text-gray-400 "
                          : "text-gray-600"
                      }`}
                    >
                      {t("MODAL.MESSAGE")}
                    </span>{" "}
                    {queryParsed.title}
                  </h1>
                  <div className="bg-red-300 p-3 rounded-md">
                    <h1 className="font-medium text-md">
                      {t("MODAL.DELETE_WARNING_ONE")}
                    </h1>
                    <h1 className="font-medium text-md">
                      {t("MODAL.DELETE_WARNING_TWO")}
                    </h1>
                  </div>
                  <div className="flex space-x-3">
                    {articleDeleted.fetching ? (
                      <Proccess />
                    ) : (
                      <Button
                        label={t("MODAL.DELETED")}
                        onClick={handleDeleted}
                      />
                    )}

                    <div
                      onClick={closeModal}
                      className={`font-medium cursor-pointer text-md border w-full  h-9 md:h-11 flex items-center justify-center rounded-md  duration-300 space-x-3   ${
                        cookie.theme === "dark"
                          ? "border-[#353535] text-white hover:bg-[#353535]"
                          : "hover:bg-gray-100 text-black"
                      }`}
                    >
                      <h1 className="font-medium text-sm w-full whitespace-nowrap flex justify-center">
                        {t("MODAL.CANCEL")}
                      </h1>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modals;
