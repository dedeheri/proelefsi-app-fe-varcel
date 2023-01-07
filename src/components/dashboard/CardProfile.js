import React from "react";

import convertToPlain from "../../utils/convertToPlantText";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function CardProfile({ title, image_url, content, topics }) {
  return (
    <div className="lg:flex lg:space-x-5 ">
      <div>
        <LazyLoadImage
          effect="blur"
          src={image_url}
          alt={image_url}
          className="lg:w-80 lg:h-32 h-[15rem] w-screen bg-cover rounded-md"
        />
      </div>
      <div className="space-y-2">
        {/* title */}
        <h1 className="font-medium text-xl">{title}</h1>
        {/* content */}
        <h1 className="whitespace-normal lg:hidden block text-md text-gray-500 dark:text-gray-400 leading-5">
          {convertToPlain(content).length > 150
            ? convertToPlain(content).substring(0, 150) + "..."
            : convertToPlain(content)}
        </h1>
        <h1 className="whitespace-normal hidden lg:block text-md text-gray-500 dark:text-gray-400 leading-5">
          {convertToPlain(content).length > 320
            ? convertToPlain(content).substring(0, 320) + "..."
            : convertToPlain(content)}
        </h1>
        {/* topics */}
        <div className="flex">
          <h1 className="font-medium  text-sm bg-gray-100 dark:bg-[#3A3B3C] px-2 py-0.5 rounded-md">
            {topics}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default CardProfile;
