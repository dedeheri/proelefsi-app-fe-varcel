import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forYou } from "../../constants/action/main";
import CardVertical from "./CardVertical";
import { CardVerticalLoading } from ".";

function ForYou() {
  const { data, error, loading, message } = useSelector(
    (state) => state.forYou
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(forYou());
  }, [dispatch]);

  return loading ? (
    <CardVerticalLoading />
  ) : error ? (
    <div>
      <h1>{message}</h1>
    </div>
  ) : (
    <div className="space-y-9">
      {data.map((data) => (
        <CardVertical data={data} key={data._id} />
      ))}
    </div>
  );
}

export default ForYou;
