import { TrashIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch } from "react-redux";
import PopperVerifyEmail from "./auth/PopperVerifyEmail";
import PopperChangeRole from "./auth/PopperChangeRole";
import { DELETE_ARTICLE_MODAL } from "../../constants/actiontypes/other";
import { verify } from "../../assets/image";

function TableUser({ data }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const coulums = [
    t("USER.TABLE.FULLNAME"),
    t("USER.TABLE.ROLE"),
    t("USER.TABLE.EMAIL_VERIFY"),
    t("USER.TABLE.DATE"),
    t("USER.TABLE.ACTIVE"),
  ];

  function handleDetailUser(id, fullname) {
    navigate({
      pathname: `/dashboard/user/${id}/${fullname.replaceAll(" ", "-")}`,
    });
  }

  const dispatch = useDispatch();
  function onClickShowModalDelete(id, fullname) {
    dispatch({
      type: DELETE_ARTICLE_MODAL,
      modal: true,
      data: fullname,
      id: id,
    });
  }

  return (
    <div className="overflow-y-auto scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-thin">
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
            <th className="relative">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>

        {/* content */}
        <tbody>
          {Object.values(data).map((d, i) => (
            <tr
              key={i}
              className=" text-black hover:bg-gray-100 dark:hover:bg-[#19191a] border-b duration-400 dark:border-[#3A3B3C] duration-300"
            >
              <td className="font-medium text-md md:text-md text-black dark:text-white whitespace-nowrap flex justify-between items-center group px-5 md:px-7 py-3 w-[62rem] md:w-full">
                <div className="flex items-center space-x-5">
                  {/* image */}

                  <div className="md:w-12 md:h-12 h-10 w-10 ">
                    <LazyLoadImage
                      src={d.image_url}
                      effect="blur"
                      alt={d.image_url}
                      className=" rounded-full md:w-12 md:h-12 h-10 w-10 border dark:border-[#3A3B3C]"
                    />
                  </div>
                  <div>
                    <div className="flex space-x-2 items-center">
                      <h1
                        onClick={() => handleDetailUser(d._id, d.fullname)}
                        className="text-sm md:text-md cursor-pointer text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white duration-300"
                      >
                        {d.fullname}
                      </h1>
                      {d.offical && <img src={verify} className="w-4 h-4" />}
                    </div>
                    <h1 className="text-sm md:text-md text-gray-500">
                      {d.email}
                    </h1>
                  </div>
                </div>
              </td>
              {/* role */}
              <td className="font-medium text-sm md:text-md text-black dark:text-white whitespace-nowrap px-5 md:px-7 py-2">
                <PopperChangeRole id={d._id} role={d.role} />

                {/* end popper */}
              </td>
              {/* verify email */}
              <td className="font-medium text-sm md:text-md text-black dark:text-white whitespace-nowrap px-5 md:px-7 py-2">
                <PopperVerifyEmail id={d._id} verify={d.email_verify} />
              </td>
              {/* join */}
              <td className="font-medium text-sm md:text-md text-black dark:text-white whitespace-nowrap px-5 md:px-7 py-2">
                <h1>{d.createdAt}</h1>
              </td>
              {/* Last active */}
              <td className="font-medium text-sm md:text-md text-black dark:text-white whitespace-nowrap px-5 md:px-7 py-2">
                <h1
                  className={`${
                    d.last_active === "Online"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {d.last_active}
                </h1>
              </td>
              {/* action */}
              <td className="font-medium text-sm md:text-md text-black dark:text-white whitespace-nowrap px-5 md:px-7 py-2">
                <div className="flex space-x-3">
                  <button
                    onClick={() => onClickShowModalDelete(d._id, d.fullname)}
                    className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white duration-300"
                  >
                    <TrashIcon className="w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        {/* end content */}
      </table>
    </div>
  );
}

export default TableUser;
