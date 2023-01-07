import React, { useEffect, useState } from "react";
import { requestActivityArticle } from "../../../action/home";
import { Container, NewActivityArticle } from "../../../components";
import { empty } from "../../../assets/image";

function Home() {
  const [data, setData] = useState({
    loading: true,
    error: false,
    success: false,
    message: "",
    data: [],
  });

  useEffect(() => {
    requestActivityArticle(setData);
  }, []);

  return (
    <Container>
      {data.loading ? (
        <div className="px-5 md:px-7 pt-4 md:pt-6 lg:pt-8 pb-3 md:pb-2 lg:pb-7 animate-pulse space-y-3 ">
          <div className="flex justify-between items-center ">
            <div className="h-8 w-40 bg-gray-200 dark:bg-[#353535] rounded-md" />
            <div className="h-8 w-20 bg-gray-200 dark:bg-[#353535] rounded-md" />
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className=" space-y-3 ">
              <div className="h-6 w-1/2 bg-gray-200 dark:bg-[#353535] rounded-md" />
              <div className="h-6 w-20 bg-gray-200 dark:bg-[#353535] rounded-md" />
            </div>
          ))}
        </div>
      ) : data?.data?.length === 0 ? (
        <div className="max-w-3xl mx-auto pt-32 px-4">
          <div className="space-y-10">
            <img src={empty} alt="empty" className="mx-auto w-80 md:w-96" />
            <h1 className="font-medium text-xl md:text-2xl text-gray-400 flex justify-center">
              {data.message}
            </h1>
          </div>
        </div>
      ) : (
        <NewActivityArticle data={data} />
      )}
    </Container>
  );
}

export default Home;
