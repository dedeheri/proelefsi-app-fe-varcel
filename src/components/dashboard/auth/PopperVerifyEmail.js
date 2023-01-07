import { Popover, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import verifyEmailAccountAction from "../../../constants/action/auth/action.verifyEmailAccount";

function PopperVerifyEmail({ id, verify }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { fetching } = useSelector((state) => state.verifyEmailAccountAction);
  function handleVerifyEmail(id, verify) {
    dispatch(verifyEmailAccountAction(id, verify));
  }

  return (
    <Popover className="relative">
      <Popover.Button className={"py-1.5"}>
        <div className="cursor-pointer flex items-center space-x-2">
          <h1 className="font-medium text-sm md:text-md">{verify.t}</h1>
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
        <Popover.Panel className="absolute left-0  rounded-md z-10 mt-2 w-72 md:w-60">
          <div className="overflow-hidden shadow-lg bg-white dark:bg-[#19191a] rounded-lg border dark:border-[#353535]">
            {/* tab */}
            {fetching ? (
              <div className="p-2 space-y-2">
                <div className="h-5 w-full bg-gray-200 dark:bg-[#353535] rounded-md" />
                <div className="h-5 w-full bg-gray-200 dark:bg-[#353535] rounded-md" />
              </div>
            ) : (
              <>
                <div className="hover:bg-gray-100 hover:dark:bg-[#363535] duration-300  relative cursor-pointer  py-2 pl-10 pr-4">
                  <div
                    onClick={() => handleVerifyEmail(id, true)}
                    className="flex "
                  >
                    {verify.value ? (
                      <CheckIcon className="w-5 absolute inset-y-0 left-2 top-2" />
                    ) : null}
                    <h1 className="text-md ">{t("USER.VERIFY_EMAIL")}</h1>
                  </div>
                </div>
                <div className="hover:bg-gray-100 hover:dark:bg-[#363535] duration-300  relative cursor-pointer  py-2 pl-10 pr-4">
                  <div
                    onClick={() => handleVerifyEmail(id, false)}
                    className="flex "
                  >
                    {!verify.value ? (
                      <CheckIcon className="w-5 absolute inset-y-0 left-2 top-2" />
                    ) : null}
                    <h1 className="text-md ">{t("USER.VERIFY_NOT_EMAIL")}</h1>
                  </div>
                </div>
              </>
            )}
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default PopperVerifyEmail;
