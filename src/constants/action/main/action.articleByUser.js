import ARTILCEBYUSER from "../../../api/fetching/main/articleByUser";
import * as actionType from "../../actiontypes/main";

function articleByUserAction(username) {
  return async function (dispatch) {
    try {
      dispatch({ type: actionType.FETCHING_ARTICLE_USER });
      const response = await ARTILCEBYUSER(username);
      dispatch({
        type: actionType.SUCCESS_ARTICLE_USER,
        result: response.data.result,
        page: response.data.page,
        message: response.data.message,
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({
          type: actionType.FAILED_ARTICLE_USER,
          message: error?.message,
        });
      } else {
        dispatch({
          type: actionType.FAILED_ARTICLE_USER,
          message:
            error.response?.data?.message || error?.response?.data?.error,
        });
      }
    }
  };
}

export default articleByUserAction;
