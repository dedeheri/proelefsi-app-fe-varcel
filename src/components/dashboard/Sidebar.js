import React from "react";

import { NavLink } from "react-router-dom";

import {
  DocumentTextIcon,
  HomeIcon,
  UserIcon,
  PencilIcon,
  ChartBarIcon,
  KeyIcon,
} from "@heroicons/react/24/outline";
import { useTranslation } from "react-i18next";

function Sidebar({ otoritas }) {
  const { t } = useTranslation();
  return (
    <div className="w-[4rem] duration-300 bg-white z-40 dark:bg-black pt-5 h-full min-h-screen border-r dark:border-[#353535]">
      <div className="flex flex-col h-screen space-y-5 items-center justify-center">
        <NavLink
          data-tip={t("SIDEBAR.HOME")}
          to={"/dashboard"}
          end={true}
          className={({ isActive }) =>
            isActive
              ? "text-[#2374e1]  p-1 rounded-md duration-300"
              : "dark:text-gray-600 text-gray-500 dark:hover:text-white  p-1 rounded-md hover:text-black duration-300"
          }
        >
          <HomeIcon className="w-7" />
        </NavLink>
        <NavLink
          data-tip={t("SIDEBAR.ARTICLE")}
          to={"/dashboard/article"}
          className={({ isActive }) =>
            isActive
              ? "text-[#2374e1]  p-1 rounded-md duration-300"
              : "dark:text-gray-600 text-gray-500 dark:hover:text-white  p-1 rounded-md hover:text-black duration-300"
          }
        >
          <PencilIcon className="w-7" />
        </NavLink>

        <NavLink
          data-tip={t("SIDEBAR.ANALYSIS")}
          to={"/dashboard/analysis"}
          className={({ isActive }) =>
            isActive
              ? "text-[#2374e1]  p-1 rounded-md duration-300"
              : "dark:text-gray-600 text-gray-500 dark:hover:text-white  p-1 rounded-md hover:text-black duration-300"
          }
        >
          <ChartBarIcon className="w-7" />
        </NavLink>

        {otoritas === "Admin" ? (
          <>
            <NavLink
              data-tip={t("SIDEBAR.TOPICS")}
              to={"/dashboard/topics"}
              className={({ isActive }) =>
                isActive
                  ? "text-[#2374e1]  p-1 rounded-md duration-300"
                  : "dark:text-gray-600 text-gray-500 dark:hover:text-white  p-1 rounded-md hover:text-black duration-300"
              }
            >
              <DocumentTextIcon className="w-7" />
            </NavLink>
            <div className="border-b w-1/3 dark:border-[#353535]" />
            <NavLink
              data-tip={t("SIDEBAR.ROLE")}
              to={"/dashboard/role"}
              className={({ isActive }) =>
                isActive
                  ? "text-[#2374e1]  p-1 rounded-md duration-300"
                  : "dark:text-gray-600 text-gray-500 dark:hover:text-white  p-1 rounded-md hover:text-black duration-300"
              }
            >
              <KeyIcon className="w-7" />
            </NavLink>

            <NavLink
              data-tip={t("SIDEBAR.USER")}
              to={"/dashboard/user"}
              className={({ isActive }) =>
                isActive
                  ? "text-[#2374e1]  p-1 rounded-md duration-300"
                  : "dark:text-gray-600 text-gray-500 dark:hover:text-white  p-1 rounded-md hover:text-black duration-300"
              }
            >
              <UserIcon className="w-7" />
            </NavLink>
          </>
        ) : null}
      </div>
    </div>
  );
}

export default Sidebar;
