import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MessageNotFound } from "../../components/main";
import { shortLink } from "../../constants/action/main";
import { Jelly } from "@uiball/loaders";

function ShortLink() {
  const params = useParams();
  const dispatch = useDispatch();

  const { message, data, error, success, loading } = useSelector(
    (state) => state.shortLink
  );
  useEffect(() => {
    dispatch(shortLink(params.id));
  }, [dispatch, params.id]);
  console.log(message);

  if (success) {
    window.location.href = data;
  }

  return loading ? (
    <div className="h-screen flex justify-center items-center">
      <Jelly size={100} speed={1} color="#2374e1" />
    </div>
  ) : error ? (
    <MessageNotFound message={message} />
  ) : null;
}

export default ShortLink;
