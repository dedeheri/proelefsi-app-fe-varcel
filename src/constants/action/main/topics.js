import { GETTOPICS } from "../../../api/fetching/main/topics";
import * as actionType from "../../actiontypes/main";

function getTopics() {
  return async function (dispatch) {
    try {
      dispatch({ type: actionType.RELOG_ERROR_TOPICS });
      const response = await GETTOPICS();

      dispatch({
        type: actionType.SUCCESS_GET_TOPICS,
        payload: response.data.topics,
        message: response.data.message,
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({
          type: actionType.FAILED_GET_TOPICS,
          message: error?.message,
        });
      } else {
        dispatch({
          type: actionType.FAILED_GET_TOPICS,
          message:
            error.response?.data?.message || error?.response?.data?.error,
        });
      }
    }
  };
}

export default getTopics;
