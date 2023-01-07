import {
  BriefcaseIcon,
  EnvelopeIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Zoom from "react-medium-image-zoom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Dialog, Transition } from "@headlessui/react";
import { useTranslation } from "react-i18next";
import { getAllCookies } from "../../utils/Cookie";
import { getUser } from "../../constants/action";
import { XMarkIcon } from "@heroicons/react/20/solid";

import { Link } from "react-router-dom";

import ModalChangeProfile from "./ModalChangeProfile";
import ModalChangeBio from "./ModalChangeBio";

function HeaderMe() {
  // calling api
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.profileUser);

  const { t } = useTranslation();
  const cookie = getAllCookies();

  // state
  const [showModal, setShowModal] = useState(false);
  const [modalChangeProfile, setModalChangeProfile] = useState(false);
  const [modalChangeBio, setModalChangeBio] = useState(false);

  function handleModal() {
    setShowModal((prev) => !prev);
  }

  function handleModalChangeBio() {
    setModalChangeBio((prev) => !prev);
  }

  function handleModalChangeProfile() {
    setModalChangeProfile((prev) => !prev);
  }

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div>
      <div className="bg-blue-50 dark:bg-[#070E1E] rounded-md">
        <div className="lg:flex space-y-4 lg:space-y-0 md:space-x-9 md:py-14 md:px-28 py-7 px-10">
          <div className="flex justify-center">
            <Zoom>
              <LazyLoadImage
                effect="blur"
                alt={data.fullname}
                src={data.image_url}
                className="h-32 w-32 lg:w-[11.4rem] lg:h-40 rounded-full"
              />
            </Zoom>
          </div>
          <div className="w-full space-y-3">
            {/* name */}
            <div className="lg:flex justify-between space-y-3 lg:space-y-0">
              <h1 className="font-medium  text-2xl lg:text-3xl">
                {data.fullname}
              </h1>

              <div className="flex space-x-2">
                <div
                  onClick={handleModal}
                  className="font-medium text-white text-md bg-[#2374e1] w-36 h-9 md:h-10 flex items-center justify-center rounded-md hover:bg-blue-500 duration-300 space-x-2 cursor-pointer"
                >
                  <PencilIcon className="w-5 md:w-6" />
                  <h1 className="font-medium text-md md:text-lg">
                    {t("PROFILE.UPDATE.EDIT")}
                  </h1>
                </div>

                <Link
                  to={"/dashboard/article/add"}
                  onClick={handleModal}
                  className="font-medium text-white text-md bg-gray-500 w-44 h-9 md:h-10 flex items-center justify-center rounded-md hover:bg-gray-400 duration-300 space-x-2 cursor-pointer"
                >
                  <PlusIcon className="w-5 md:w-6" />
                  <h1 className="font-medium text-md md:text-lg">
                    {t("ARTICLE.ADD_ARTICLE")}
                  </h1>
                </Link>
              </div>
            </div>
            {/* email */}
            <div className="space-y-1">
              <div className="flex space-x-2">
                <EnvelopeIcon className="w-5 md:w-6 text-gray-400" />
                <h1 className="font-medium text-md md:text-lg text-gray-400">
                  {data.email}
                </h1>
              </div>
              <div className="flex space-x-2">
                <BriefcaseIcon className="w-5 md:w-6 text-gray-400" />
                <h1 className="font-medium text-md md:text-lg text-gray-400">
                  {data.createdAt}
                </h1>
              </div>
            </div>
            {/* bio */}
            <p className="!leading-5 block lg:hidden text-lg md:text-xl text-gray-500">
              {data.bio?.length > 100
                ? data.bio.substring(0, 100) + "..."
                : data.bio}
            </p>
            <p className="!leading-5 hidden lg:block text-lg md:text-xl text-gray-500">
              {data.bio?.length > 200
                ? data.bio.substring(0, 200) + "..."
                : data.bio}
            </p>
          </div>
        </div>
      </div>

      <Transition appear show={showModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={handleModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
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
                  className={`w-full max-w-3xl transform rounded-2xl  text-left align-middle border shadow-xl transition-all  ${
                    cookie.theme === "dark"
                      ? "bg-[#242526] border-[#353535]"
                      : "bg-white"
                  } `}
                >
                  <div className="">
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
                        {t("PROFILE.UPDATE.UPDATE_PROFILE")}
                      </h1>

                      <button
                        onClick={handleModal}
                        className={`rounded-full p-1 duration-300  ${
                          cookie.theme === "dark"
                            ? "hover:bg-[#474849] text-white"
                            : "hover:bg-gray-100 text-black"
                        }`}
                      >
                        <XMarkIcon className="w-7 text-md font-medium" />
                      </button>
                    </div>

                    <div className="space-y-2 px-5 py-3">
                      <div className="flex justify-between items-center">
                        <h1
                          className={`font-medium text-lg  ${
                            cookie.theme === "dark"
                              ? "text-white"
                              : "text-black"
                          }`}
                        >
                          {t("PROFILE.UPDATE.PROFILE_PICTURE")}
                        </h1>
                        <h1
                          onClick={handleModalChangeProfile}
                          className={`text-blue-500 cursor-pointer px-3 font-medium hover:rounded-md p-1 duration-300  ${
                            cookie.theme === "dark"
                              ? "hover:bg-[#474849] "
                              : "hover:bg-gray-200"
                          }`}
                        >
                          {t("PROFILE.UPDATE.EDIT")}
                        </h1>
                      </div>

                      <div className="flex justify-center">
                        <Zoom>
                          <LazyLoadImage
                            effect="blur"
                            alt={data.fullname}
                            src={data.image_url}
                            className="h-32 w-32 lg:w-40 lg:h-40 rounded-full"
                          />
                        </Zoom>
                      </div>
                    </div>

                    <div className="space-y-2 px-5 py-3 pb-10">
                      <div className="flex justify-between items-center">
                        <h1
                          className={`font-medium text-lg  ${
                            cookie.theme === "dark"
                              ? "text-white"
                              : "text-black"
                          }`}
                        >
                          {t("PROFILE.UPDATE.BIODATA")}
                        </h1>
                        <h1
                          onClick={handleModalChangeBio}
                          className={`text-blue-500 cursor-pointer px-3 font-medium hover:rounded-md p-1 duration-300  ${
                            cookie.theme === "dark"
                              ? "hover:bg-[#474849] "
                              : "hover:bg-gray-200"
                          }`}
                        >
                          {t("PROFILE.UPDATE.EDIT")}
                        </h1>
                      </div>

                      <p className="!leading-5 text-lg md:text-xl text-gray-500">
                        {data.bio}
                      </p>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* nested modal change photo */}
      <ModalChangeProfile
        onClose={handleModalChangeProfile}
        onShow={modalChangeProfile}
      />
      {/* nestes modal change bio */}
      <ModalChangeBio
        onClose={handleModalChangeBio}
        onShow={modalChangeBio}
        data={data}
      />
    </div>
  );
}

export default HeaderMe;
