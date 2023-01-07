import { Popover, Transition } from "@headlessui/react";
import { MoonIcon } from "@heroicons/react/24/outline";
import React, { Fragment } from "react";

function SwitchTheme() {
  return (
    <Popover className="relative z-50 ">
      <Popover.Button className="rounded-full p-0.5 dark:hover:text-white duration-300 mt-1 flex ">
        <div className="flex space-x-2 hover:bg-gray-200 px-4 py-2">
          <MoonIcon className="w-5" />
          <h1 className="font-medium">Terang</h1>
        </div>
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-500"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute -left-[4.5rem] mt-1 z-10 bg-white w-56 -translate-x-1/2 transform px-4  sm:px-0 rounded-lg">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="flex space-x-2 hover:bg-gray-200 px-4 py-2">
              <h1 className="font-medium">c</h1>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default SwitchTheme;
