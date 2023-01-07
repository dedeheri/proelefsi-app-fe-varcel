import { ArrowPathIcon } from "@heroicons/react/24/solid";
import React from "react";
import { useTranslation } from "react-i18next";
import Language from "./Language";
import Theme from "./Theme";

function LanguageAndTheme() {
  const { t } = useTranslation();
  return (
    <div className="space-y-3 md:space-y-4 w-full">
      <div className="border dark:border-[#3A3B3C] rounded-lg">
        <div className="flex items-center  border-b dark:border-[#3A3B3C] dark:bg-[#111111] bg-gray-50 space-x-2 rounded-t-md px-4 py-2">
          <ArrowPathIcon className="w-5 h-5 md:w-6 md:h-6" />
          <h1 className="text-md md:text-lg font-medium">
            {t("SETTING.LANGTHEME.LABEL")}
          </h1>
        </div>

        {/* lang */}
        <Language />
        <div className="border-b dark:border-[#3A3B3C]" />
        {/* theme */}
        <Theme />
      </div>
    </div>
  );
}

export default LanguageAndTheme;
