import { useTranslation } from "react-i18next";
import { Button, Proccess } from "../../../components";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { getAllCookies } from "../../../utils/Cookie";
import { useDispatch, useSelector } from "react-redux";
import { DELETE_ARTICLE_MODAL } from "../../../constants/actiontypes/other";
import { deleteArticleAction } from "../../../constants/action/dashboard";

function DeleteArticle() {
  const { t } = useTranslation();
  const cookie = getAllCookies();
  const dispatch = useDispatch();
  const {
    delete: { modal, data: title, id },
  } = useSelector((state) => state.reportModalDeleteMainRedux);
  const {
    delete: { fetching },
  } = useSelector((state) => state.article);

  function closeModal() {
    dispatch({ type: DELETE_ARTICLE_MODAL, modal: false });
  }

  function handleDeleted() {
    dispatch(deleteArticleAction(id));
  }

  return (
    <Transition appear show={modal} as={Fragment}>
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
                    ? "bg-[#242526] border-[#353535]"
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
                    {title}
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
                    <div className="w-full">
                      {fetching ? (
                        <Proccess />
                      ) : (
                        <Button
                          label={t("MODAL.DELETED")}
                          onClick={handleDeleted}
                        />
                      )}
                    </div>

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

export default DeleteArticle;
