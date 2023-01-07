import DETAILARTICLE from "../../../api/fetching/main/detailArticle";
import * as actionType from "../../actiontypes/main";

function detailArticle(id) {
  return async function (dispatch) {
    try {
      const response = await DETAILARTICLE(id);
      dispatch({
        type: actionType.SUCCESS_GET_DETAIL_ARTICLE,
        payload: response.data.result,
        message: response.data.message,
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({
          type: actionType.FAILED_GET_DETAIL_ARTICLE,
          message: error?.message,
        });
      } else {
        dispatch({
          type: actionType.FAILED_GET_DETAIL_ARTICLE,
          message:
            error.response?.data?.message || error?.response?.data?.error,
        });
      }
    }
  };
}

export default detailArticle;
