import { Dialog, Transition } from "@headlessui/react";
import {
  ClockIcon,
  DocumentMagnifyingGlassIcon,
  DocumentTextIcon,
  HashtagIcon,
  TagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { requestGetDetailArticle } from "../../action/article";
import { getAllCookies } from "../../utils/Cookie";

function ModalView() {
  const navigate = useNavigate();
  const params = useParams();

  const cookie = getAllCookies();

  // state
  const [detail, setDetail] = useState({
    loading: false,
    error: false,
    success: false,
    message: "",
    data: [],
  });

  useEffect(() => {
    requestGetDetailArticle(setDetail, params.id);
  }, [params.id]);

  useEffect(() => {
    const span = document.getElementsByTagName("span");
    const href = document.getElementById("a");

    console.log(href);

    if (cookie.theme === "dark") {
      for (let i = 0; i < span?.length; i++) {
        span[i].style.background = "none";
        span[i].style.color = "#fff";
      }
      for (let i = 0; i < href?.length; i++) {
        href[i].style.background = "none";
        href[i].style.color = "blue";
      }
    }
  }, [detail]);

  console.log(detail);

  return (
    <div
      className={`inset-0  px-9 md:px-4 fixed h-full z-50  bg-black bg-opacity-60 backdrop-blur-sm ${
        true ? "-translate-y-0 " : "-translate-y-full"
      }`}
    >
      {/* content */}
      <div
        className={`relative inset-0 top-12 mx-auto h-[52rem] w-full md:w-[73rem] transform overflow-y-auto scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-thin rounded-xl bg-white dark:bg-[#242526] border dark:border-[#3a3b3c] text-left align-middle shadow-xl duration-300 text-white  ${
          true ? "scale-100 " : "scale-95"
        }`}
      >
        <div className="border-b text-black dark:text-white dark:border-[#3a3b3c] px-5 py-3 flex items-center justify-between">
          <h1 className="text-xl font-medium">Quick View</h1>
          <div
            onClick={() => navigate(-1)}
            className="bg-gray-100 cursor-pointer hover:bg-gray-200 dark:bg-[#3a3b3c] dark:hover:bg-[#404142] p-2 duration-300 rounded-full"
          >
            <XMarkIcon className="w-5 text-gray-600 dark:text-gray-300 rounded-lg" />
          </div>
        </div>
        <div className="px-12 py-7 md:px-20 md:py-10 space-y-10">
          <h1 className="text-4xl font-medium text-black dark:text-white">
            {detail.data.title}
          </h1>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-6 dark:text-gray-400 text-gray-500" />
              <h1 className="font-medium dark:text-gray-400 text-gray-500">
                Created By
              </h1>
              <h1 className="font-medium text-black dark:text-white">
                {detail.data.fullname}
              </h1>
              <h1 className="font-medium dark:text-gray-400 text-gray-500">
                On
              </h1>
              <h1 className="font-medium text-black dark:text-white">
                {detail.data.createdAt}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <DocumentMagnifyingGlassIcon className="w-6 dark:text-gray-400 text-gray-500" />
              <h1 className="font-medium dark:text-gray-400 text-gray-500">
                Topics
              </h1>
              <h1 className="font-medium text-black dark:text-white">
                {detail.data.topics}
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <HashtagIcon className="w-6 dark:text-gray-400 text-gray-500" />
              <h1 className="font-medium dark:text-gray-400 text-gray-500">
                Tags
              </h1>
              {detail.data.tags?.map((_, i) => (
                <div
                  key={i}
                  className="dark:bg-[#3a3b3c] bg-gray-100 px-2 py-1 rounded-md"
                >
                  <h1 className="font-medium text-black dark:text-white">
                    {_}
                  </h1>
                </div>
              ))}
            </div>
          </div>

          <h1 dangerouslySetInnerHTML={{ __html: detail.data.content }}></h1>
        </div>
      </div>
      {/* end content */}
    </div>
  );
}

export default ModalView;
