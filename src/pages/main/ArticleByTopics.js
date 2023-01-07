import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  CardVertical,
  Container,
  MessageNotFound,
  CardVerticalLoading,
  MaxWidth,
} from "../../components/main";
import { byTopics } from "../../constants/action/main";
import { CLEAR_BY_TOPICS_ARTICLE } from "../../constants/actiontypes/main";

// loading

function ArticleByTopics() {
  // params
  const params = useParams();
  // redux
  const dispatch = useDispatch();
  const { data, loading, error, message } = useSelector(
    (state) => state.byTopics
  );

  // calling api
  useEffect(() => {
    dispatch(byTopics(params.topics));
  }, [dispatch, params.topics]);

  // clear data in redux
  useEffect(() => {
    return () => dispatch({ type: CLEAR_BY_TOPICS_ARTICLE });
  }, [params.topics]);

  return (
    <Container>
      <MaxWidth>
        {loading ? (
          <CardVerticalLoading />
        ) : error ? (
          <MessageNotFound message={message} />
        ) : (
          data.map((data, index) => <CardVertical key={index} data={data} />)
        )}
      </MaxWidth>
    </Container>
  );
}

export default ArticleByTopics;
