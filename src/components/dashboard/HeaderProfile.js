import { BriefcaseIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Zoom from "react-medium-image-zoom";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function HeaderProfile({ user }) {
  return (
    <div className="bg-blue-50 dark:bg-[#070E1E] rounded-md">
      <div className="lg:flex space-y-4 lg:space-y-0 md:space-x-9 md:py-14 md:px-28 py-7 px-10 ">
        <div className="flex justify-center lg:block">
          <Zoom>
            <LazyLoadImage
              effect="blur"
              alt={user.user.fullname}
              src={user.user.image_url}
              className="h-32 w-32 lg:w-40 lg:h-40 rounded-full"
            />
          </Zoom>
        </div>
        <div className="w-full lg:w-1/2 space-y-3">
          {/* name */}
          <h1 className="font-medium  text-2xl md:text-3xl">
            {user.user.fullname}
          </h1>
          {/* email */}
          <div className="space-y-1">
            <div className="flex space-x-2">
              <EnvelopeIcon className="w-5 md:w-6 text-gray-400" />
              <h1 className="font-medium text-md md:text-lg text-gray-400">
                {user.user.email}
              </h1>
            </div>
            <div className="flex space-x-2">
              <BriefcaseIcon className="w-5 md:w-6 text-gray-400" />
              <h1 className="font-medium text-md md:text-lg text-gray-400">
                {user.user.createdAt}
              </h1>
            </div>
          </div>
          {/* bio */}
          <p className="!leading-5 block lg:hidden text-lg md:text-xl text-gray-500">
            {user.user.bio?.length > 100
              ? user.user.bio.substring(0, 100) + "..."
              : user.user.bio}
          </p>
          <p className="!leading-5 hidden lg:block text-lg md:text-xl text-gray-500">
            {user.user.bio?.length > 200
              ? user.user.bio.substring(0, 200) + "..."
              : user.user.bio}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeaderProfile;
