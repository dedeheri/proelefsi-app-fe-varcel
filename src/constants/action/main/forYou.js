import FORYOU from "../../../api/fetching/main/forYou";
import * as actionType from "../../actiontypes/main";

function forYou(query) {
  return async function (dispatch) {
    try {
      dispatch({ type: actionType.RELOG_ERROR_FORYOU_ARTICLE });
      const response = await FORYOU(query);
      dispatch({
        type: actionType.SUCCESS_GET_FORYOU_ARTICLE,
        payload: response.data.result,
        message: response.data.message,
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({
          type: actionType.FAILED_GET_FORYOU_ARTICLE,
          message: error?.message,
        });
      } else {
        dispatch({
          type: actionType.FAILED_GET_FORYOU_ARTICLE,
          message:
            error.response?.data?.message || error?.response?.data?.error,
        });
      }
    }
  };
}

export default forYou;
