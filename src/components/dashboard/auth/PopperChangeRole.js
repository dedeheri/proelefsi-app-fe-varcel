import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import changeRoleAction from "../../../constants/action/auth/action.changeRole";

function PopperChangeRole({ role, id }) {
  const dispatch = useDispatch();
  const {
    data: roles,
    error,
    loading,
    message,
  } = useSelector((state) => state.role);

  const { fetching } = useSelector((state) => state.changeRoleAction);

  function handleChangeRole(id, role) {
    dispatch(changeRoleAction(id, role));
  }

  return (
    <Popover className="relative">
      <Popover.Button className={"py-1.5"}>
        <div className="cursor-pointer flex items-center space-x-2">
          <h1 className="font-medium text-sm md:text-md">{role}</h1>
          <ChevronDownIcon className="w-5" />
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
        <Popover.Panel className="absolute left-0  rounded-md z-50 mt-2 w-72 md:w-60">
          <div className="overflow-hidden shadow-lg bg-white dark:bg-[#19191a] rounded-lg border dark:border-[#353535]">
            {/* tab */}

            {loading ? (
              <div className="space-y-3 animate-pulse py-2  px-4 ">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gray-200 dark:bg-[#353535] h-5 rounded-md"
                  />
                ))}
              </div>
            ) : error ? (
              <h1 className="text-red-400 p-5">{message}</h1>
            ) : fetching ? (
              <div className="p-2 space-y-2 animate-pulse">
                <div className="h-5 w-full bg-gray-200 dark:bg-[#353535] rounded-md" />
                <div className="h-5 w-full bg-gray-200 dark:bg-[#353535] rounded-md" />
              </div>
            ) : (
              roles?.map((roles, index) => (
                <div
                  onClick={() => handleChangeRole(id, roles.body)}
                  key={index}
                  className="hover:bg-gray-100 hover:dark:bg-[#363535] duration-300  relative cursor-pointer  py-2 pl-10 pr-4"
                >
                  <div className="flex ">
                    {roles.body === role ? (
                      <CheckIcon className="w-5 absolute inset-y-0 left-2 top-2" />
                    ) : null}
                    <h1 className="text-md ">{roles.role}</h1>
                  </div>
                </div>
              ))
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default PopperChangeRole;
