import { ArrowPathIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { Fragment, useState } from "react";
import Zoom from "react-medium-image-zoom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { getAllCookies } from "../../utils/Cookie";
import { XMarkIcon } from "@heroicons/react/20/solid";

import { requestChangePhoto } from "../../action/user";
import Proccess from "../init/Proccess";

function ModalChangeProfile({ onClose, onShow }) {
  const cookie = getAllCookies();
  const { t } = useTranslation();
  const [imageProfile, setImageProfile] = useState({
    fetching: false,
    image_url: "",
    image_url_priview: null,
    message: "",
    error: false,
    success: false,
  });

  function onChangeImage(e) {
    const image = e.target.files[0];
    if (image) {
      setImageProfile((prev) => ({ ...prev, image_url: image }));
      setImageProfile((prev) => ({
        ...prev,
        image_url_priview: URL.createObjectURL(image),
      }));
    } else {
      setImageProfile((prev) => ({ ...prev, image_url: null }));
      setImageProfile((prev) => ({
        ...prev,
        image_url_priview: null,
      }));
    }
  }

  function onRemoveImage() {
    setImageProfile((prev) => ({ ...prev, image_url: null }));
    setImageProfile((prev) => ({
      ...prev,
      image_url_priview: null,
    }));
  }

  function onSubmitChangeImage(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image_url", imageProfile.image_url);
    requestChangePhoto(setImageProfile, formData);
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
                      {t("PROFILE.UPDATE.UPDATE_PROFILE_PICTURE")}
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
                  <div className="px-5 py-3 space-y-10 pb-8">
                    {imageProfile.image_url_priview && (
                      <div className="flex justify-center">
                        <Zoom>
                          <LazyLoadImage
                            effect="blur"
                            alt={imageProfile.image_url_priview}
                            src={imageProfile.image_url_priview}
                            className="h-56 w-56 lg:w-80 lg:h-80 rounded-full"
                          />
                        </Zoom>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div
                        className={` cursor-pointer duration-300 w-full flex justify-center items-center h-10 md:h-11 rounded-md ${
                          cookie.theme === "dark"
                            ? "bg-[#263951] hover:bg-[#21354d]"
                            : "bg-blue-200 hover:bg-blue-100"
                        }`}
                      >
                        <label
                          htmlFor="file-upload"
                          className="p-1 cursor-pointer flex items-center space-x-2"
                        >
                          {imageProfile.image_url_priview ? (
                            <>
                              <ArrowPathIcon className="w-7 text-md font-medium text-blue-500" />
                              <h1 className="text-md font-medium text-blue-500">
                                {t("PROFILE.UPDATE.CHANGE_PHOTO")}
                              </h1>
                            </>
                          ) : (
                            <>
                              <PlusIcon className="w-7 text-md font-medium text-blue-500" />
                              <h1 className="text-md font-medium text-blue-500">
                                {t("PROFILE.UPDATE.UPLOAD_PHOTO")}
                              </h1>
                            </>
                          )}
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={onChangeImage}
                          />
                        </label>
                      </div>

                      {imageProfile.image_url_priview && (
                        <div
                          onClick={onRemoveImage}
                          className={`flex justify-center items-center space-x-2 h-10 md:h-11 rounded-md cursor-pointer  duration-300 ${
                            cookie.theme === "dark"
                              ? "bg-[#3a3b3c] hover:bg-[#474849] text-white"
                              : "bg-gray-300 hover:bg-gray-200 text-black"
                          }`}
                        >
                          <TrashIcon className="w-7 text-md font-medium" />
                          <h1 className="text-md font-medium">
                            {t("PROFILE.UPDATE.REMOVE_PHOTO")}
                          </h1>
                        </div>
                      )}
                    </div>

                    {imageProfile.image_url_priview && (
                      <div
                        onClick={onSubmitChangeImage}
                        className=" flex justify-end"
                      >
                        {imageProfile.fetching ? (
                          <div className="w-32">
                            <Proccess />
                          </div>
                        ) : (
                          <button className="bg-blue-500 hover:bg-blue-600 cursor-pointer duration-300  items-center h-10 md:h-11 rounded-md w-32">
                            <h1 className="text-md font-medium text-white">
                              {t("PROFILE.UPDATE.SAVE_PHOTO")}
                            </h1>
                          </button>
                        )}
                      </div>
                    )}
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

export default ModalChangeProfile;
