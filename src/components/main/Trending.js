import React, { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardHorizontal, CardHorizontalLoading, TryAgain } from ".";
import getTrending from "../../constants/action/main/trending";

function Trending() {
  const [tryAgain, ForceTryAgain] = useReducer((x) => x + 1, 0);
  const dispatch = useDispatch();
  const { data: notInterestedSuccess } = useSelector(
    (state) => state.notInterested
  );
  const { data, message, error, loading } = useSelector(
    (state) => state.trending
  );
  function handleTryAgain() {
    ForceTryAgain();
  }
  useEffect(() => {
    dispatch(getTrending());
  }, [dispatch, tryAgain, notInterestedSuccess]);

  return loading ? (
    <CardHorizontalLoading />
  ) : error ? (
    <TryAgain message={message} onClick={handleTryAgain} />
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
      {data?.map((result, index) => (
        <CardHorizontal result={result} key={index} />
      ))}
    </div>
  );
}

export default Trending;
