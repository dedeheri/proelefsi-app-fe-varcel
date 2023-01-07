import React, { Fragment, useEffect, useState } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { getAllCookies } from "../../utils/Cookie";
import { XMarkIcon } from "@heroicons/react/20/solid";

import { requestChangeBiodata } from "../../action/user";
import Proccess from "../init/Proccess";

function ModalChangeBio({ onClose, onShow, data }) {
  const cookie = getAllCookies();
  const { t } = useTranslation();

  const [changeBioProfile, setChangeBioProfile] = useState({
    fetching: false,
    bio: "",
    message: "",
    error: false,
    success: false,
  });

  useEffect(() => {
    setChangeBioProfile((prev) => ({ ...prev, bio: data?.bio }));
  }, [data]);

  function onChangeBiodata(e) {
    setChangeBioProfile((prev) => ({ ...prev, bio: e.target.value }));
  }

  function handleUpdateBiodata(e) {
    e.preventDefault();
    requestChangeBiodata(setChangeBioProfile, changeBioProfile);
  }

  return (
    <Transition appear show={onShow} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-95" />
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
                className={`w-full max-w-2xl transform rounded-2xl  md:overflow-auto overflow-y-auto scrollbar-thumb-gray-700 scrollbar-thumb-rounded-full scrollbar-thin h-auto duration-300 text-left align-middle border shadow-xl transition-all  ${
                  cookie.theme === "dark"
                    ? "bg-[#242526] border-[#353535]"
                    : "bg-white"
                } `}
              >
                <div>
                  <div
                    className={`flex justify-between items-center border-b px-5 py-3 ${
                      cookie.theme === "dark" ? "border-[#353535]" : ""
                    }`}
                  >
                    <h1
                      className={`font-medium text-lg  ${
                        cookie.theme === "dark" ? "text-white" : "text-black"
                      }`}
                    >
                      {t("PROFILE.UPDATE.UPDATE_BIODATA")}
                    </h1>

                    <button
                      onClick={onClose}
                      className={`rounded-full p-1 duration-300  ${
                        cookie.theme === "dark"
                          ? "hover:bg-[#474849] text-white"
                          : "hover:bg-gray-100 text-black"
                      }`}
                    >
                      <XMarkIcon className="w-7 text-md font-medium" />
                    </button>
                  </div>
                  <form
                    onSubmit={handleUpdateBiodata}
                    className="px-5 py-3 space-y-10 pb-8"
                  >
                    <div className=" w-full">
                      <textarea
                        onChange={onChangeBiodata}
                        className={`w-full p-2 rounded-md ${
                          cookie.theme === "dark"
                            ? changeBioProfile.error
                              ? "border-red-500 border outline-none bg-black text-white"
                              : "border-[#353535] border outline-none bg-black text-white"
                            : changeBioProfile.error
                            ? "border-red-500 border"
                            : "border outline-none  "
                        }`}
                        defaultValue={changeBioProfile.bio || ""}
                        rows={7}
                      />
                      {changeBioProfile?.error && (
                        <h1 className="font-medium text-red-500">
                          {
                            changeBioProfile?.message?.validation?.biodata
                              ?.message
                          }
                        </h1>
                      )}
                    </div>
                    <div className=" flex justify-end">
                      {changeBioProfile.fetching ? (
                        <div className="w-32">
                          <Proccess />
                        </div>
                      ) : (
                        <button className="bg-blue-500 hover:bg-blue-600 cursor-pointer duration-300  items-center h-10 md:h-11 rounded-md w-32">
                          <h1 className="text-md font-medium text-white">
                            {t("PROFILE.UPDATE.SAVE_BIODATA")}
                          </h1>
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalChangeBio;
