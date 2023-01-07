import React from "react";
import toast from "react-hot-toast";
import { XMarkIcon } from "@heroicons/react/24/outline";

function Toast({ t, response }) {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-black dark:bg-[#353535] text-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <p className="text-sm font-medium ">{response.data.message}</p>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium"
        >
          <XMarkIcon className="w-6" />
        </button>
      </div>
    </div>
  );
}

export default Toast;
