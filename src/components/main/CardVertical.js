import { More, Share } from "./";
import convertToPlain from "../../utils/convertToPlantText";
import { Link } from "react-router-dom";
import { verify } from "../../assets/image";

function CardVertical({ data }) {
  return (
    <div className="space-y-2 md:-space-y-4">
      <div className="md:flex items-center md:justify-between w-full space-y-5 space-x-8 group">
        {/* content */}
        <div className="space-y-3 w-full">
          {/* authour */}
          <div className="flex space-x-4 items-center">
            <img
              src={data.authour.image_url}
              alt={data.authour.fullname}
              className="w-10 md:w-9 h-10 md:h-9 rounded-full"
            />
            <div className="w-full">
              <div className="flex space-x-2 items-center">
                <Link
                  to={"/" + data.authour.username}
                  className="flex space-x-2 items-center"
                >
                  <h1 className="font-medium text-md text-gray-700 hover:text-black duration-300 dark:text-white">
                    {data.authour.fullname}
                  </h1>
                  <img src={verify} className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex space-x-2 items-center dark:text-gray-400 text-gray-500">
                <h1>{data.timestamps}</h1>
              </div>
            </div>
          </div>
          <div>
            <a
              className="cursor-pointer group space-y-2"
              href={data.url.originalLink}
            >
              <div className="space-y-2">
                <h1 className="font-medium text-lg md:text-xl dark:group-hover:text-gray-300 duration-300 group-hover:text-gray-600">
                  {data.title}
                </h1>
                <p className="dark:text-gray-400 text-gray-500 hidden md:block !leading-6 font-serif">
                  {convertToPlain(data.content).length > 200
                    ? convertToPlain(data.content).substring(0, 200) + "..."
                    : convertToPlain(data.content)}
                </p>

                <p className="dark:text-gray-400 text-gray-500 md:hidden block !leading-6 font-serif">
                  {convertToPlain(data.content).length > 100
                    ? convertToPlain(data.content).substring(0, 100) + "..."
                    : convertToPlain(data.content)}
                </p>
              </div>
            </a>
          </div>

          <div className="-space-y-1">
            {/* topics */}

            <div className="flex items-center justify-between w-full ">
              <div className="flex space-x-3 dark:text-gray-400 text-gray-500">
                <Link
                  to={`topics/${data.topics}`}
                  className=" dark:text-gray-300 text-gray-600 hover:text-black duration-300 dark:hover:text-white"
                >
                  {data.topics}
                </Link>
                <h1>•</h1>
                <h1>{data.reading_time + " Mins"}</h1>
              </div>

              <div className="flex space-x-2 ">
                {/* share */}
                <Share result={data} />
                {/* dots */}
                <More title={data.title} id={data._id} />
              </div>
            </div>
          </div>
        </div>
        {/* image */}
        <div className="h-36 w-52  hidden md:block">
          <img
            src={data.image_url}
            alt={data.title}
            className="w-full h-full  rounded-md opacity-100 group-hover:opacity-80 duration-300"
          />
        </div>
      </div>
    </div>
  );
}

export default CardVertical;
