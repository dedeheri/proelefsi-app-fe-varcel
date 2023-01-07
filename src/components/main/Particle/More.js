import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChatBubbleBottomCenterIcon,
  ExclamationTriangleIcon,
  MinusCircleIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { REPORT_MODAL } from "../../../constants/actiontypes/other";
import { notInterested } from "../../../constants/action/main";
import ReactTooltip from "react-tooltip";

function More({ title, id }) {
  const dispatch = useDispatch();
  function onShowModalReport() {
    dispatch({ type: REPORT_MODAL, payload: true, data: title, id: id });
  }

  function onClickNotInterested(id) {
    dispatch(notInterested(id));
  }
  return (
    <Menu as="div" className="relative  inline-block  ">
      <ReactTooltip place="bottom" style={"dark"} effect="solid" />
      <div>
        <Menu.Button
          data-tip={"Lainnya"}
          className="dark:text-gray-400  duration-300 text-[#5E5E5E] hover:text-black dark:hover:text-white "
        >
          <EllipsisVerticalIcon className="w-6" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute font-sans font-medium z-50 shadow-md dark:shadow-gray-900 top-11 right-0 w-44 bg-white dark:bg-[#242526] rounded-md border dark:border-[#3A3B3C]">
          <div className="px-2 py-2">
            {/* <Menu.Item>
              <button
                onClick={() => onClickNotInterested(id)}
                className="hover:dark:bg-[#3A3B3C] hover:bg-gray-100  p-1 cursor-pointer flex w-full items-center rounded-md space-x-2"
              >
                <MinusCircleIcon className="w-5 h-5" />
                <h1>Not interested</h1>
              </button>
            </Menu.Item> */}
            <Menu.Item>
              <div
                onClick={onShowModalReport}
                className="hover:dark:bg-[#3A3B3C] hover:bg-gray-100  p-1 cursor-pointer flex w-full items-center rounded-md space-x-2"
              >
                <ExclamationTriangleIcon className="w-5 h-5" />
                <h1>Report</h1>
              </div>
            </Menu.Item>
            {/* <Menu.Item>
              <div className="hover:dark:bg-[#3A3B3C] hover:bg-gray-100  p-1 cursor-pointer flex w-full items-center rounded-md space-x-2">
                <ChatBubbleBottomCenterIcon className="w-5 h-5" />
                <h1>Feedback</h1>
              </div>
            </Menu.Item> */}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default More;
