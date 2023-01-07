import React, { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { getAllCookies } from "../../../utils/Cookie";

function Theme() {
  const { t } = useTranslation();
  const cookie = getAllCookies();

  const darkmode = [
    {
      name: t("FOOTER.DARK"),
      code: "dark",
    },
    {
      name: t("FOOTER.LIGHT"),
      code: "light",
    },
  ];

  const currentTheme = darkmode.find((l) => l?.code === cookie.theme);

  const [themes, setThemes] = useState(currentTheme);

  function changeTheme() {
    window.location.reload();
  }
  useEffect(() => {
    cookies.set("theme", themes?.code, { expires: 30 });
  }, [themes]);

  return (
    <Listbox value={themes} onChange={setThemes}>
      <div className="relative ">
        <Listbox.Button className="text-md border px-2 rounded-md hover:bg-gray-100 dark:hover:text-gray-300 duration-300 flex items-center space-x-2">
          <span className="block truncate">
            {themes?.name === undefined ? darkmode[1].name : themes?.name}
          </span>
          <span>
            <ChevronDownIcon
              className="h-6 w-6 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute right-0 top-8  max-h-60 w-48 overflow-auto rounded-md bg-white border dark:bg-[#18191a] dark:border-[#353535] text-base shadow-lg sm:text-sm">
            {darkmode.map((theme, i) => (
              <Listbox.Option
                key={i}
                className={`relative cursor-pointer select-none px-2 py-1 ${
                  theme?.code === currentTheme?.code
                    ? "bg-blue-200 dark:bg-blue-500"
                    : "hover:bg-blue-200 dark:hover:bg-blue-500"
                } `}
                value={theme}
              >
                <span
                  onClick={changeTheme}
                  className={`block truncate text-sm`}
                >
                  {theme.name}
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default Theme;
