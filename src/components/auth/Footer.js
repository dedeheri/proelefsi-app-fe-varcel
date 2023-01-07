import React, { useState, Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import i18next from "i18next";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";

import { getAllCookies } from "../../utils/Cookie";

function Footer() {
  const { t } = useTranslation();
  const cookie = getAllCookies();

  const languages = [
    {
      code: "en",
      name: "English",
    },
    {
      code: "id",
      name: "Bahasa Indonesia",
    },
  ];

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

  const currentLanguageCode = cookie.i18next || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  const currentTheme = darkmode.find((l) => l?.code === cookie.theme);

  const [selected, setSelected] = useState(currentLanguage);
  const [themes, setThemes] = useState(currentTheme);

  function changeTheme() {
    window.location.reload();
  }
  useEffect(() => {
    cookies.set("theme", themes?.code, { expires: 30 });
  }, [themes]);

  return (
    <div className="space-y-3">
      <div className="flex justify-center items-center space-x-3">
        <h1 className="text-sm text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 duration-300">
          {t("FOOTER.ABOUT")}
        </h1>
        <h1 className="text-sm text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 duration-300">
          {t("FOOTER.TERMS")}
        </h1>
        <h1 className="text-sm text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 duration-300">
          {t("FOOTER.PRIVACY")}
        </h1>

        <div className="w-auto">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative">
              <Listbox.Button className="text-sm text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 duration-300 flex items-center space-x-1">
                <span className="block truncate">{selected.name}</span>
                <span className="">
                  <ChevronDownIcon
                    className="h-4 w-4 text-gray-400"
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
                <Listbox.Options className="absolute max-h-60 w-48 overflow-auto rounded-md bg-white border dark:bg-[#18191a] dark:border-[#353535] py-1 text-base shadow-lg sm:text-sm">
                  {languages.map((lang, i) => (
                    <Listbox.Option
                      key={i}
                      className={`relative cursor-pointer select-none px-2 py-1 ${
                        lang.code === currentLanguageCode
                          ? "bg-blue-200 dark:bg-blue-500"
                          : "hover:bg-blue-200 dark:hover:bg-blue-500"
                      } `}
                      value={lang}
                    >
                      <span
                        onClick={() => {
                          i18next.changeLanguage(lang.code);
                        }}
                        className={`block truncate text-sm`}
                      >
                        {lang.name}
                      </span>
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        {/* theme */}
        <div className="w-auto">
          <Listbox value={themes} onChange={setThemes}>
            <div className="relative">
              <Listbox.Button className="text-sm text-gray-500 dark:text-gray-400 dark:hover:text-gray-300 duration-300 flex items-center space-x-1">
                <span className="block truncate">
                  {themes?.name === undefined ? darkmode[1].name : themes?.name}
                </span>
                <span className="">
                  <ChevronDownIcon
                    className="h-4 w-4 text-gray-400"
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
                <Listbox.Options className="absolute max-h-60 w-48 overflow-auto rounded-md bg-white border dark:bg-[#18191a] dark:border-[#353535] py-1 text-base shadow-lg sm:text-sm">
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
        </div>
      </div>

      <h1 className="text-sm text-gray-500 dark:text-gray-400 flex justify-center">
        © 2022 Proelefsi
      </h1>
    </div>
  );
}

export default Footer;
