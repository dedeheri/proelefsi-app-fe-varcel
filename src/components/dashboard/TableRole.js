import React from "react";
import { useTranslation } from "react-i18next";

function TableRole({ data }) {
  const { t } = useTranslation();

  const coulums = [
    t("ROLE.TABLE.ROLE"),
    t("ROLE.TABLE.DATE"),
    t("ROLE.TABLE.TOTAL"),
  ];

  return (
    <div className=" overflow-y-auto scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-thumb-rounded-full scrollbar-thin">
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
          {Object.values(data)?.map((role, index) => (
            <tr
              key={index}
              className=" text-black hover:bg-gray-100 dark:hover:bg-[#19191a] border-b duration-400 dark:border-[#3A3B3C] duration-300"
            >
              <td className="font-medium  text-md md:text-md text-black dark:text-white whitespace-nowrap px-5 md:px-7 py-2">
                <h1>{role.role}</h1>
              </td>
              <td className="font-medium  text-md md:text-md text-black dark:text-white whitespace-nowrap px-5 md:px-7 py-2">
                <h1>{role.createdAt}</h1>
              </td>
              <td className="font-medium  text-md md:text-md text-black dark:text-white whitespace-nowrap px-5 md:px-7 py-2">
                <h1>{role.user_role}</h1>
              </td>
            </tr>
          ))}
        </tbody>
        {/* end content */}
      </table>
      {/* modal */}
    </div>
  );
}

export default TableRole;
