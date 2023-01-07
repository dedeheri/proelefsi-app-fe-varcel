import GETARTICLEBYTOPICS from "../../../api/fetching/main/byTopics";
import * as actionType from "../../actiontypes/main";

function byTopics(id) {
  return async function (dispatch) {
    try {
      dispatch({ type: actionType.RELOG_ERROR_BY_TOPICS_ARTICLE });
      const response = await GETARTICLEBYTOPICS(id);

      dispatch({
        type: actionType.SUCCESS_GET_BY_TOPICS_ARTICLE,
        payload: response.data.result,
        message: response.data.message,
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({
          type: actionType.FAILED_GET_BY_TOPICS_ARTICLE,
          message: error?.message,
        });
      } else {
        dispatch({
          type: actionType.FAILED_GET_BY_TOPICS_ARTICLE,
          message:
            error.response?.data?.message || error?.response?.data?.error,
        });
      }
    }
  };
}

export default byTopics;
