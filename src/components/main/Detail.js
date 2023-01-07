import { Link } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Share from "./Particle/Share";
import More from "./Particle/More";
import MaxWidth from "./Particle/MaxWidth";

import { useEffect } from "react";
import { getAllCookies } from "../../utils/Cookie";

function Detail({ data, error, message, loading }) {
  const { theme } = getAllCookies();
  useEffect(() => {
    const raws = document.querySelectorAll("[id=raw]");
    const codes = document.querySelectorAll("[id=code]");
    if (!loading) {
      if (theme === "dark") {
        for (let i = 0; i < raws.length; i++) {
          raws[i].classList.add("raw-dark-mode");
        }
        for (let i = 0; i < codes.length; i++) {
          codes[i].classList.add("code-dark");
        }
        // raws.classList.add("raw-dark-mode");
      } else {
        for (let i = 0; i < raws.length; i++) {
          raws[i].classList.add("raw-dark-light");
        }
        for (let i = 0; i < codes.length; i++) {
          codes[i].classList.add("code-light");
        }
      }
    }
  }, [data]);

  return (
    <MaxWidth>
      {loading ? (
        <div className="space-y-10 animate-pulse">
          {/* headers */}
          <div className="max-w-3xl mx-auto">
            <div className="flex space-x-3 items-center ">
              <div className="w-10 h-10 bg-gray-200 dark:bg-[#353535] rounded-full" />

              <div className="w-full">
                <div className="flex space-x-2 justify-between">
                  <div className="w-40 h-4 bg-gray-200 dark:bg-[#353535] rounded-md" />
                  <div className="w-7 h-7 bg-gray-200 dark:bg-[#353535] rounded-full" />
                </div>
                <div className="flex space-x-2">
                  <div className="w-24 h-4 bg-gray-200 dark:bg-[#353535] rounded-md" />
                  <div className="w-4 h-4 bg-gray-200 dark:bg-[#353535] rounded-full" />
                  <div className="w-40 h-4 bg-gray-200 dark:bg-[#353535] rounded-md" />
                  <div className="w-4 h-4 bg-gray-200 dark:bg-[#353535] rounded-full" />
                  <div className="w-40 h-4 bg-gray-200 dark:bg-[#353535] rounded-md" />
                </div>
              </div>
            </div>
          </div>
          {/* title */}
          <div className="max-w-3xl mx-auto space-y-3">
            <div className="w-full h-8 bg-gray-200 dark:bg-[#353535] rounded-md" />
            <div className="w-full h-6 bg-gray-200 dark:bg-[#353535] rounded-md" />
          </div>
          {/* image */}

          {/* content */}
          <div className="max-w-3xl mx-auto space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-full h-5 bg-gray-200 dark:bg-[#353535] rounded-md"
              />
            ))}
          </div>
        </div>
      ) : error ? (
        <div className="mt-32 flex justify-center font-serif ">
          <div className="space-y-5">
            <h1 className="text-8xl flex justify-center text-gray-500">404</h1>
            <p className="flex justify-center text-3xl">{message}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-10">
          {/* headers */}
          <div className="max-w-3xl mx-auto">
            <div className="flex space-x-3 items-center ">
              <img
                src={data.authour.image_url}
                alt={data.authour.fullname}
                className="w-10 md:w-12 h-10 md:h-12 rounded-full"
              />
              <div className="w-full">
                <div className="flex space-x-2 justify-between items-center">
                  <Link to={"/" + data.authour.username}>
                    <h1 className="font-medium text-lg text-gray-700 hover:text-black duration-300 dark:text-white">
                      {data.authour.fullname}
                    </h1>
                  </Link>

                  <div className="space-x-2 flex items-center">
                    <Share result={data} />
                    <More title={data.title} id={data._id} />
                  </div>
                </div>
                <div className="flex text-md space-x-2">
                  <h1 className="text-gray-500 dark:text-gray-400">
                    {data.timestamps}
                  </h1>
                  <h1 className="text-gray-500 dark:text-gray-400">•</h1>
                  <Link to={`/topics/${data.topics}`}>
                    <h1 className="text-gray-500 dark:text-gray-400">
                      {data.topics}
                    </h1>
                  </Link>
                  <h1 className="text-gray-500 dark:text-gray-400">•</h1>
                  <h1 className="text-gray-500 dark:text-gray-400">
                    {data.reading_time + " min"}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          {/* title */}
          <div className="max-w-3xl mx-auto space-y-3 font-serif">
            <h1 className="text-3xl">{data.title}</h1>
            <h1 className="text-xl text-gray-600 dark:text-gray-400">
              {data.sub_title}
            </h1>
          </div>
          {/* image */}

          <Zoom>
            <img
              alt={data.title}
              src={data.image_url}
              className="mx-auto w-full rounded-md"
            />
          </Zoom>
          {/* content */}
          <div className="max-w-3xl mx-auto space-y-9 ">
            {data.content.map((_, index) => (
              <div
                className="font-serif text-lg  md:text-xl text-gray-800 dark:text-gray-300"
                key={index}
                dangerouslySetInnerHTML={{ __html: _ }}
              />
            ))}
            {/* tags */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {data.tags.map((_, i) => (
                <Link
                  key={i}
                  to={`/tags/${_}`}
                  className="bg-gray-100 dark:bg-[#242526] hover:dark:bg-[#444444] dark:!text-white flex justify-center !text-black px-4 py-1 rounded-full text-lg duration-300"
                >
                  {_}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </MaxWidth>
  );
}

export default Detail;
