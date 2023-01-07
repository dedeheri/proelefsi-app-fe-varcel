import ChangePassword from "./ChangePassword";
import ChangeName from "./ChangeName";
import { UserIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";

function General() {
  const { t } = useTranslation();

  return (
    <div className="space-y-3 md:space-y-4 w-full">
      <div className="border dark:border-[#3A3B3C] rounded-lg">
        <div className="flex items-center  border-b dark:border-[#3A3B3C] dark:bg-[#111111] bg-gray-50 space-x-2 rounded-t-md px-4 py-2">
          <UserIcon className="w-5 h-5 md:w-6 md:h-6" />
          <h1 className="text-md md:text-lg font-medium">
            {t("SETTING.GENERAL.LABEL")}
          </h1>
        </div>

        {/* name */}
        <ChangeName />
        <div className="border-b dark:border-[#3A3B3C]" />
        {/* password */}
        <ChangePassword />
      </div>
    </div>
  );
}

export default General;
