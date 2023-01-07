import React, { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { getAllCookies } from "../../../utils/Cookie";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
function Language() {
  const { t } = useTranslation();

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

  const currentLanguageCode = getAllCookies().i18next || "en";
  const currentLanguage = languages.find((l) => l.code === currentLanguageCode);

  const [selected, setSelected] = useState(currentLanguage);
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <Listbox.Button className="text-md dark:hover:text-gray-300 duration-300 flex items-center space-x-2">
          <span className="block truncate">{selected.name}</span>
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
          <Listbox.Options className="absolute max-h-60 w-48 overflow-auto rounded-md bg-white border dark:bg-[#18191a] dark:border-[#353535] py-1 text-base shadow-lg sm:text-sm z-40">
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
  );
}

export default Language;
