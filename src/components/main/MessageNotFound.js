import React from "react";
import { empty } from "../../assets/image";

function MessageNotFound({ message }) {
  return (
    <div className="max-w-3xl mx-auto pt-32 px-4">
      <div className="space-y-10">
        <img src={empty} alt="empty" className="mx-auto w-80 md:w-96" />
        <h1 className="font-medium text-xl md:text-2xl text-gray-400 flex justify-center">
          {message}
        </h1>
      </div>
    </div>
  );
}

export default MessageNotFound;
