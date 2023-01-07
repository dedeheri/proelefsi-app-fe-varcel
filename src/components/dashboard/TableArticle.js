import {
  ChartBarIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import millify from "millify";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import { getAllCookies } from "../../utils/Cookie";
import { requestChangeArticle } from "../../action/article";
import Page from "./Page";
import { useDispatch } from "react-redux";
import { DELETE_ARTICLE_MODAL } from "../../constants/actiontypes/other";
import convertToPlain from "../../utils/convertToPlantText";

function TableArticle({ data, setChange, page, perPage }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const cookie = getAllCookies();
  const [copy, setCopy] = useState({
    values: "",
    copied: false,
  });

  const coulums = [
    t("ARTICLE.TABLE.ARTICLE"),
    t("ARTICLE.TABLE.TOPICS"),
    t("ARTICLE.TABLE.WRITTER"),
    t("ARTICLE.TABLE.READING"),
    t("ARTICLE.TABLE.VIEW"),
    t("ARTICLE.TABLE.DATE"),
  ];

  function handleEdit(id) {
    navigate({
      pathname: `edit/${id}`,
    });
  }

  const handleCopyLink = () =>
    toast(t("ARTICLE.COPY_LINK") + copy.values, {
      style: {
        borderRadius: "10px",
        padding: "10px",
        background: cookie.theme === "dark" ? "#353535" : "#fff",
        color: cookie.theme === "dark" ? "#fff" : "#000",
      },
    });

  function changeDraftOrPublish(id, draft) {
    requestChangeArticle(setChange, id, draft);
  }

  function onClickAnalysis(id) {
    navigate({
      pathname: `${id}/analysis`,
    });
  }

  function onClickShowModalDelete(title, id) {
    dispatch({ type: DELETE_ARTICLE_MODAL, data: title, id: id, modal: true });
  }

  return (
    <div className="overflow-y-auto h-full scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-thin">
      <table className="min-w-full table-fixed">
        <thead>
          <tr className="border-b dark:border-[#3A3B3C] ">
            {coulums.map((items, key) => (
              <th
                key={key}
                className="whitespace-nowrap font-medium text-md text-left text-gray-500 py-3 px-7"
              >
                {items}
              </th>
            ))}
          </tr>
        </thead>

        {/* content */}
        <tbody>
          {Object.values(data).map((d, i) => (
            <tr
              key={i}
              className=" text-black hover:bg-gray-100 dark:hover:bg-[#19191a] border-b duration-400 dark:border-[#3A3B3C] duration-300"
            >
              <td className=" text-black dark:text-white whitespace-nowrap flex justify-between items-center group px-5 md:px-7 py-5  md:w-full">
                <div className="flex items-center space-x-5">
                  {/* image */}
                  <div className="w-40 ">
                    <img
                      src={d.image_url}
                      alt={d.image_url}
                      className="rounded-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    {d.draft && (
                      <div className="flex justify-start">
                        <h1 className="dark:bg-yellow-600 bg-yellow-400 text-sm py-1 px-5  rounded-lg">
                          draft
                        </h1>
                      </div>
                    )}
                    <a href={d.url.originalLink} target="_blank">
                      <h1 className="text-md font-medium">
                        {d.title.length > 70
                          ? d.title.substring(0, 70) + "..."
                          : d.title}
                      </h1>
                    </a>
                    <div className="w-[25rem]">
                      <h1 className="whitespace-normal text-md text-gray-500 dark:text-gray-400 leading-5">
                        {convertToPlain(d.content).length > 130
                          ? convertToPlain(d.content).substring(0, 130) + "..."
                          : convertToPlain(d.content)}
                      </h1>
                    </div>
                    <div className="items-center flex justify-between space-x-3">
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 duration-300">
                        <button
                          onClick={() => onClickAnalysis(d._id, d.title)}
                          className="dark:text-gray-400 text-gray-500 hover:text-black dark:hover:text-white duration-300"
                        >
                          <ChartBarIcon className="w-5" />
                        </button>
                        <button
                          onClick={() => handleEdit(d._id)}
                          className="dark:text-gray-400 text-gray-500 hover:text-black dark:hover:text-white duration-300"
                        >
                          <PencilSquareIcon className="w-5" />
                        </button>
                        <button
                          onClick={() => onClickShowModalDelete(d.title, d._id)}
                          className="dark:text-gray-400 text-gray-500 hover:text-black dark:hover:text-white duration-300"
                        >
                          <TrashIcon className="w-5" />
                        </button>
                        {/* dropdown */}

                        <Menu
                          as="div"
                          className="relative  inline-block text-left "
                        >
                          <div>
                            <Menu.Button className="dark:text-gray-400 text-gray-500 hover:text-black dark:hover:text-white duration-300 pt-1">
                              <EllipsisVerticalIcon className="w-5" />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute z-50  top-0 left-7 w-56 bg-white dark:bg-[#242526] rounded-md border dark:border-[#3A3B3C]">
                              <div className="px-1 py-1 ">
                                <Menu.Item>
                                  {({ active }) =>
                                    d.draft ? (
                                      <button
                                        onClick={() =>
                                          changeDraftOrPublish(d._id, false)
                                        }
                                        className={`${
                                          active
                                            ? "bg-gray-100 text-black dark:bg-[#3A3B3C] dark:text-white"
                                            : "text-black dark:text-white"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                      >
                                        {t("ARTICLE.ADD.DROPDOWN.PUBLISH")}
                                      </button>
                                    ) : (
                                      <button
                                        onClick={() =>
                                          changeDraftOrPublish(d._id, true)
                                        }
                                        className={`${
                                          active
                                            ? "bg-gray-100 text-black dark:bg-[#3A3B3C] dark:text-white"
                                            : "text-black dark:text-white"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                      >
                                        {t("ARTICLE.ADD.DROPDOWN.DRAFT")}
                                      </button>
                                    )
                                  }
                                </Menu.Item>
                                {d.draft ? null : (
                                  <>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <div
                                          className={`${
                                            active
                                              ? "bg-gray-100 text-black dark:bg-[#3A3B3C] dark:text-white"
                                              : "text-black dark:text-white"
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer`}
                                        >
                                          <CopyToClipboard
                                            text={d.url.shortLink}
                                            onCopy={() =>
                                              setCopy({ copied: true })
                                            }
                                          >
                                            <button onClick={handleCopyLink}>
                                              {t("ARTICLE.ADD.DROPDOWN.COPY")}
                                            </button>
                                          </CopyToClipboard>
                                        </div>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          className={`${
                                            active
                                              ? "bg-gray-100 text-black dark:bg-[#3A3B3C] dark:text-white"
                                              : "text-black dark:text-white"
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                          {t("ARTICLE.ADD.DROPDOWN.FACEBOOK")}
                                        </button>
                                      )}
                                    </Menu.Item>
                                    <Menu.Item>
                                      {({ active }) => (
                                        <button
                                          className={`${
                                            active
                                              ? "bg-gray-100 text-black dark:bg-[#3A3B3C] dark:text-white"
                                              : "text-black dark:text-white"
                                          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                        >
                                          {t("ARTICLE.ADD.DROPDOWN.TWITTER")}
                                        </button>
                                      )}
                                    </Menu.Item>
                                  </>
                                )}
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                        {/* end dropdown */}
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              {/* topics */}
              <td className="font-medium  text-md md:text-md text-black dark:text-white whitespace-nowrap px-5 md:px-7 py-2">
                <h1>{d.topics}</h1>
              </td>
              {/* writter */}
              <td className="font-medium text-md md:text-md text-black dark:text-white whitespace-nowrap px-5 md:px-7 py-2">
                <h1>{d.authour.fullname}</h1>
              </td>
              {/* time */}
              <td className="font-medium text-md md:text-md text-black dark:text-white whitespace-nowrap px-5 md:px-7 py-2">
                <h1>{parseInt(d.reading_time) + " min"}</h1>
              </td>
              {/* view */}
              <td className="font-medium text-md md:text-md text-black dark:text-white whitespace-nowrap px-5 md:px-7 py-2">
                <h1>{millify(d.view)}</h1>
              </td>

              {/* date */}
              <td className="font-medium text-md md:text-md text-black dark:text-white whitespace-nowrap px-5 md:px-7 py-2">
                <h1>{d.timestamps}</h1>
              </td>
            </tr>
          ))}
        </tbody>
        {/* end content */}
      </table>

      <Page page={page} perPage={perPage} cookieName={"pp"} />
    </div>
  );
}

export default TableArticle;
