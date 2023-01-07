import React, { useEffect, useState } from "react";
import { KeyIcon } from "@heroicons/react/24/solid";
import { requestGetHistoryLogin } from "../../../action/account";
import { SkeletonHistoryLogin } from "../..";
import { useTranslation } from "react-i18next";

function History() {
  const { t } = useTranslation();

  const [collapse, setCollapse] = useState(false);
  const [history, setHistory] = useState({
    loading: true,
    data: [],
    message: "",
    success: false,
    error: false,
  });

  useEffect(() => {
    requestGetHistoryLogin(setHistory);
  }, []);

  return (
    <div className="space-y-3 md:space-y-4 w-full">
      <div className="border dark:border-[#3A3B3C] rounded-lg">
        <div className="flex items-center  border-b dark:border-[#3A3B3C] dark:bg-[#111111] bg-gray-50 space-x-2 rounded-t-md px-4 py-2">
          <KeyIcon className="w-5 h-5 md:w-6 md:h-6" />
          <h1 className="text-md md:text-lg font-medium">
            {t("SETTING.LOGIN_HISTORY.LABEL")}
          </h1>
        </div>

        <div
          className={`px-4 py-2 ${
            collapse ? "dark:bg-[#111111] bg-gray-50 rounded-b-lg" : ""
          }`}
        >
          <div className="space-y-3">
            {history?.loading ? (
              <SkeletonHistoryLogin />
            ) : (
              history?.data
                ?.slice(0, collapse ? history.data.length : 1)
                .map((h, i) => (
                  <div key={i}>
                    <div className="flex space-x-2 text-md font-medium">
                      <h1>{h.device.client}</h1>
                      <h1>•</h1>
                      <h1>
                        {h.location.city}, {h.location.countryName}
                      </h1>
                    </div>
                    <div className="flex space-x-2 text-sm dark:text-[#adadad] text-gray-500">
                      <h1>{h.location.ip}</h1>
                      <h1>•</h1>
                      <h1>{h.device.os}</h1>
                      <h1>•</h1>
                      <h1>{h.createdAt}</h1>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {history.data.length > 1 ? (
          !collapse ? (
            <h1
              onClick={() => setCollapse(true)}
              className="text-md cursor-pointer text-[#2374E1] border-t  dark:border-[#3A3B3C] px-4 py-2"
            >
              {t("SETTING.LOGIN_HISTORY.COLLAPSE")}
            </h1>
          ) : (
            <h1
              onClick={() => setCollapse(false)}
              className="text-md cursor-pointer text-[#2374E1] border-t  dark:border-[#3A3B3C] px-4 py-2"
            >
              {t("SETTING.LOGIN_HISTORY.UNCOLLAPSE")}
            </h1>
          )
        ) : null}
      </div>
    </div>
  );
}

export default History;
