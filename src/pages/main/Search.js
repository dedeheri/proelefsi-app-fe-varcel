import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import {
  CardVertical,
  CardVerticalLoading,
  Container,
  MaxWidth,
  MessageNotFound,
} from "../../components/main";
import searchResult from "../../constants/action/main/searchResult";
import query from "query-string";
function Search() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data, message, loading, error } = useSelector(
    (state) => state.searchResult
  );

  const queryParsed = query.parse(location.search);

  useEffect(() => {
    dispatch(searchResult(location.search));
  }, [dispatch, location.search]);

  return (
    <Container>
      <MaxWidth>
        <h1 className="text-2xl font-medium">Result for {queryParsed.q}</h1>
        {loading ? (
          <CardVerticalLoading />
        ) : error ? (
          <MessageNotFound message={message} />
        ) : (
          data.map((result, index) => (
            <CardVertical data={result} key={index} />
          ))
        )}
      </MaxWidth>
    </Container>
  );
}

export default Search;
