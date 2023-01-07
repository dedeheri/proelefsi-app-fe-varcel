import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function TableCategory({ topics, onClickDelete }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  function handleEdit(id) {
    navigate(`edit/${id}`);
  }

  const coulums = [
    t("TOPICS.COLOUMN_NAME.TOPICS"),
    t("TOPICS.COLOUMN_NAME.ADD"),
    t("TOPICS.COLOUMN_NAME.EDITED"),
    t("TOPICS.COLOUMN_NAME.DATE"),
    t("TOPICS.COLOUMN_NAME.TOTAL"),
  ];

  return (
    <div className=" overflow-y-auto scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-thin">
      <table className="min-w-full table-fixed">
        <thead>
          <tr className="border-b dark:border-[#3A3B3C] ">
            {coulums.map((items, key) => (
              <th
                key={key}
                className="whitespace-nowrap font-medium text-md px-5 text-left text-gray-500 py-3"
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
          {topics?.data?.topics?.map((d, i) => (
            <tr
              key={i}
              className=" text-black hover:bg-gray-100 dark:hover:bg-[#19191a] border-b duration-400 dark:border-[#3A3B3C] duration-300"
            >
              {/* writter */}
              <td className="font-medium text-md md:text-md text-black dark:text-white whitespace-nowrap flex justify-between items-center group px-5 py-2 w-[22rem] md:w-full space-x-3">
                <div>
                  <h1 className="whitespace-normal text-md">{d.topics}</h1>
                  <h1 className="whitespace-normal text-md dark:text-gray-400 text-gray-500">
                    {d.description}
                  </h1>
                </div>
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 duration-300">
                  <button
                    onClick={() => handleEdit(d._id)}
                    className="dark:text-gray-400 text-gray-500 hover:text-black dark:hover:text-white duration-300"
                  >
                    <PencilSquareIcon className="w-5" />
                  </button>
                  <button
                    onClick={() => onClickDelete(d._id, d.topics)}
                    className="dark:text-gray-400 text-gray-500 hover:text-black dark:hover:text-white duration-300"
                  >
                    <TrashIcon className="w-5" />
                  </button>
                </div>
              </td>
              {/* editor */}
              <td className="font-medium text-md md:text-md text-black dark:text-white whitespace-nowrap px-5 py-2">
                <h1>{d.authour}</h1>
              </td>

              <td className="font-medium text-md md:text-md text-black dark:text-white whitespace-nowrap px-5 py-2">
                <h1>{d.editor}</h1>
              </td>

              {/* times */}
              <td className="font-medium text-md md:text-md text-black dark:text-white whitespace-nowrap px-5 py-2">
                <h1>{d.timestamps}</h1>
              </td>
              {/* date */}
              <td className="font-medium text-md md:text-md text-black dark:text-white whitespace-nowrap py-2 px-5">
                <h1>{d.total}</h1>
              </td>
            </tr>
          ))}
        </tbody>
        {/* end content */}
      </table>
    </div>
  );
}

export default TableCategory;
