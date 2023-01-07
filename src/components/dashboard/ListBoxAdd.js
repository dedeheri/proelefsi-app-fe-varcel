import { Fragment, useEffect, useState } from "react";

// headlesui
import { Listbox, Transition } from "@headlessui/react";

// icons
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { requestTopics } from "../../action/topics";

export default function ListBoxAdd({ topicsSelected, setTopicsSelected }) {
  const [topics, setTopics] = useState({
    loading: true,
    error: false,
    success: false,
    message: "",
    data: {
      topics: [],
    },
  });

  // topics
  useEffect(() => {
    requestTopics(setTopics, "?ref=ls");
  }, []);
  useEffect(() => {
    setTopicsSelected(topics?.data?.topics[0]);
  }, [topics]);

  return (
    <Listbox value={topicsSelected} onChange={setTopicsSelected}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-black border dark:border-[#353535]  h-11 px-3 pr-10 text-left sm:text-sm">
          <span className="block truncate">{topicsSelected?.topics}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
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
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-y-scroll rounded-md bg-white dark:bg-black py-1 text-base sm:text-sm border dark:border-[#353535] dark:text-white">
            {topics?.data?.topics?.map((topics, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                      ? "bg-gray-200 dark:bg-[#353535] text-black dark:text-white"
                      : "text-black dark:text-white"
                  }`
                }
                value={topics}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {topics.topics}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
