import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { articleByUserAction, byTopics } from "../../constants/action/main";
import { getAllCookies } from "../../utils/Cookie";
import CardHorizontal from "./CardHorizontal";
import MessageNotFound from "./MessageNotFound";

function RecommendCardInDetail() {
  const cookie = getAllCookies();
  const { username } = useParams();

  const dispatch = useDispatch();
  const { result, loading, error, message } = useSelector(
    (state) => state.articleByUserReducer
  );

  useEffect(() => {
    dispatch(articleByUserAction(username));
  }, [username, dispatch]);

  return (
    <div className={cookie.theme === "dark" ? "dark" : "light"}>
      <div className="bg-white dark:bg-black  text-black dark:text-white px-4">
        <div className=" max-w-5xl mx-auto space-y-5">
          {loading ? (
            <h1>Loading</h1>
          ) : error ? (
            <MessageNotFound message={message} />
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {result.map((data, index) => (
                  <CardHorizontal key={index} result={data} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecommendCardInDetail;
