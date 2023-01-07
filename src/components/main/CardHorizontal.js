// utlis
import convertToPlain from "../../utils/convertToPlantText";
// components
import { More, Share } from ".";
import { Link } from "react-router-dom";
import { verify } from "../../assets/image";

function CardHorizontal({ result }) {
  return (
    <div className="space-y-3">
      {/* authour */}
      <div className="flex space-x-2 items-center">
        <img
          src={result.authour.image_url}
          alt={result.authour.fullname}
          className="w-9 md:w-8 h-9 md:h-8 rounded-full"
        />
        <div className="w-full -space-y-1">
          <div className="flex space-x-2 items-center">
            <Link
              to={"/" + result.authour.username}
              className="flex space-x-2 items-center"
            >
              <h1 className="font-medium text-md text-gray-700 hover:text-black duration-300 dark:text-white">
                {result.authour.fullname}
              </h1>
              <img src={verify} className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="h-[23rem] md:h-[23.5rem]">
        <a
          href={result.url.originalLink}
          className="cursor-pointer group space-y-2"
        >
          <img
            src={result.image_url}
            alt={result.title}
            className="w-full h-60 rounded-md opacity-100 group-hover:opacity-80 duration-300"
          />
          <div className="space-y-1">
            <h1 className="font-medium text-lg text-black dark:text-white dark:group-hover:!text-gray-300 duration-300 group-hover:!text-gray-600">
              {result.title}
            </h1>
            <h3 className="dark:text-gray-400 text-gray-500  !leading-5">
              {convertToPlain(result.content).length > 120
                ? convertToPlain(result.content).substring(0, 120) + "..."
                : convertToPlain(result.content)}
            </h3>
          </div>
        </a>
      </div>
      {/* end */}
      <div>
        <Link
          to={`topics/${result.topics}`}
          className="dark:!text-gray-300 !text-gray-600 hover:text-black duration-300 dark:hover:text-white"
        >
          {result.topics}
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex space-x-3 dark:text-gray-400 text-gray-500">
            <h1>{result.timestamps}</h1>
            <h1>•</h1>
            <h1>{result.reading_time + " Mins"}</h1>
          </div>

          <div className="flex space-x-1 items-center">
            {/* share */}
            <Share result={result} />
            {/* dots */}
            <More title={result.title} id={result._id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardHorizontal;
