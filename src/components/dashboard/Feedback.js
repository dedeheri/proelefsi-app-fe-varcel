import { Dialog, Transition } from "@headlessui/react";

import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { requestAddFeedback } from "../../action/feedback";
import { SHOW_FEEDBACK } from "../../constants/actiontypes/other";
import { getAllCookies } from "../../utils/Cookie";
import Button from "../init/Button";
import Proccess from "../init/Proccess";

function Feedback() {
  const cookie = getAllCookies();
  const { t } = useTranslation();

  const { show_modal } = useSelector((state) => state.otherRedux);
  const dispatch = useDispatch();

  function closeShowFeedback() {
    dispatch({ type: SHOW_FEEDBACK, payload: false });
  }

  const [submitFeedback, setSubmitFeedback] = useState({
    fetching: false,
    feedback: "",
    success: false,
    erorr: false,
    message: "",
  });

  function onSubmit(e) {
    e.preventDefault();

    requestAddFeedback(setSubmitFeedback, submitFeedback.feedback);
  }

  return (
    <Transition appear show={show_modal} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeShowFeedback}>
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

        <div className="fixed right-0 left-0 top-40 overflow-y-auto">
          <div className="flex min-h-full  items-center justify-center p-4 text-center">
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
                className={`w-full px-9 py-3  max-w-xl transform rounded-2xl  text-left align-middle border shadow-xl transition-all  ${
                  cookie.theme === "dark"
                    ? "bg-[#242526] border-[#353535]"
                    : "bg-white"
                } `}
              >
                <div className="flex justify-between items-center">
                  <h1
                    className={`font-medium text-lg ${
                      cookie.theme === "dark" ? "text-white " : "text-black"
                    }`}
                  >
                    Beri Masukan
                  </h1>
                </div>

                <form onSubmit={onSubmit} className="pt-10 space-y-9">
                  <div>
                    <textarea
                      onChange={(e) =>
                        setSubmitFeedback((prev) => ({
                          ...prev,
                          feedback: e.target.value,
                        }))
                      }
                      placeholder="Ada Masukan? Kami ingin mendengarkanya, tetapi jangan bagikan informasi sensitif"
                      className={`w-full ${
                        submitFeedback?.message?.feedback?.message &&
                        cookie.theme
                          ? "border border-red-500 "
                          : "border border-[#353535]"
                      } p-2 rounded-md bg-transparent outline-none`}
                      rows={5}
                    />

                    {submitFeedback?.message?.feedback?.message && (
                      <h1 className="font-medium text-red-500">
                        {submitFeedback?.message?.feedback?.message}
                      </h1>
                    )}
                  </div>

                  <div className="flex space-x-3">
                    <div
                      onClick={closeShowFeedback}
                      className={`font-medium cursor-pointer text-md border w-full h-10 md:h-11  flex items-center justify-center rounded-md  duration-300 space-x-3   ${
                        cookie.theme === "dark"
                          ? "border-[#353535] text-white hover:bg-[#353535]"
                          : "hover:bg-gray-100 text-black"
                      }`}
                    >
                      <h1 className="font-medium text-sm w-full whitespace-nowrap flex justify-center">
                        {t("MODAL.CANCEL")}
                      </h1>
                    </div>
                    {submitFeedback.fetching ? (
                      <Proccess />
                    ) : (
                      <Button label={t("MODAL.DELETED")} />
                    )}
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Feedback;
