import { Fragment, useEffect, useReducer, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { SLIDE_TOPICS } from "../../constants/actiontypes/other";
import { useNavigate } from "react-router-dom";
import { getTopics } from "../../constants/action/main";
import Theme from "../dashboard/setting/Theme";
import { getAllCookies } from "../../utils/Cookie";
import Language from "../dashboard/setting/Language";

function SlideTopics() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme } = getAllCookies();
  const { slide_topics } = useSelector((state) => state.slideTopicsRedux);

  function onCloseSlide() {
    dispatch({ type: SLIDE_TOPICS, payload: false });
  }

  // setting
  const [setting, setSetting] = useState(false);
  function onShowSetting() {
    setSetting((prev) => !prev);
  }

  // fetching api
  const [pageRelog, forcePageRelog] = useReducer((x) => x + 1, 0);
  function handleRelog() {
    forcePageRelog();
  }

  const { data, loading, message, error } = useSelector(
    (state) => state.topics
  );
  useEffect(() => {
    dispatch(getTopics());
  }, [dispatch, pageRelog]);

  function handleLinkTopics(topics) {
    navigate({
      pathname: `/topics/${topics}`,
    });
  }

  return (
    <Transition.Root show={slide_topics} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-50"
        onClose={onCloseSlide}
      >
        <div className="absolute  inset-0 overflow-hidden ">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute  inset-0 " />
          </Transition.Child>
          <div className="fixed inset-y-0 left-0-0 max-w-full flex ">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="-translate-x-full"
              enterTo="-translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="-translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative w-[15rem] md:w-[18rem] lg:w-[20rem]">
                <div
                  className={`h-full py-1 md:py-2 lg:py-3 px-5 md:px-7 lg:px-8 shadow-md ${
                    theme === "dark" ? "bg-black shadow-gray-700" : "bg-white"
                  }`}
                >
                  <div className="mt-3.5">
                    <div className="space-y-2">
                      {/* topcis */}
                      {loading ? (
                        <div className="w-full animate-pulse">
                          <div className="space-y-1">
                            <div className="h-7 w-1/2 bg-gray-100 dark:bg-[#353535] rounded-md" />
                            {[...Array(20)].map((_, i) => (
                              <div
                                key={i}
                                className="h-5 w-full bg-gray-100 dark:bg-[#353535] rounded-md"
                              />
                            ))}
                          </div>
                        </div>
                      ) : error ? (
                        <div className="flex justify-between w-full">
                          <p className="font-medium">{message}</p>
                          <div
                            onClick={handleRelog}
                            className="flex cursor-pointer items-center space-x-1 text-green-600"
                          >
                            <ArrowPathIcon className="h-4" />
                            <h1 className="font-medium">Try Again</h1>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <h1
                            className={`font-medium text-lg ${
                              theme === "dark" ? "text-white" : "text-black"
                            }`}
                          >
                            Topics
                          </h1>
                          {data?.map((d, i) => (
                            <div
                              onClick={() => handleLinkTopics(d.topics)}
                              key={i}
                              className={`cursor-pointer duration-300 whitespace-nowrap ${
                                theme === "dark"
                                  ? "text-gray-400 hover:text-white"
                                  : "text-gray-500 hover:text-black "
                              }`}
                            >
                              {d.topics}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default SlideTopics;
