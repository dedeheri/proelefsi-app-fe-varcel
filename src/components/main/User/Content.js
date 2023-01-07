import React from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import { CardVertical, CardVerticalLoading, MessageNotFound } from "..";

function Content() {
  const navigate = useNavigate();
  const { result, loading, error, message, page } = useSelector(
    (state) => state.articleByUserReducer
  );

  function onClickPage(page) {
    navigate({
      search: `${createSearchParams({
        page: page,
      })}`,
    });
  }

  return loading ? (
    <CardVerticalLoading />
  ) : error ? (
    <MessageNotFound message={message} />
  ) : (
    <div className="space-y-3 ">
      {result.map((result) => (
        <CardVertical key={result._id} data={result} />
      ))}
      <div className="border-b" />
      <div className="flex justify-end ">
        <button
          onClick={() => onClickPage(page.next.page)}
          className="text-gray-500 hover:text-black duration-200"
        >
          Tampilkan Lebih Banyak
        </button>
      </div>
    </div>
  );
}

export default Content;
