import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  Container,
  Content,
  Header,
  MessageNotFound,
} from "../../components/main";
import { articleByUserAction, userAction } from "../../constants/action/main";
function User() {
  const { username } = useParams();
  const { search } = useLocation();
  const dispatch = useDispatch();

  const { error, message } = useSelector((state) => state.userMainReducer);

  useEffect(() => {
    dispatch(userAction(username));
  }, [username, dispatch]);

  useEffect(() => {
    dispatch(articleByUserAction(username, search));
  }, [username, dispatch, search]);

  return (
    <Container>
      <div className="max-w-3xl mx-auto">
        {error ? (
          <MessageNotFound message={message} />
        ) : (
          <div className="space-y-10">
            <Header />
            <Content />
          </div>
        )}
      </div>
    </Container>
  );
}

export default User;
