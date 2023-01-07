import GETTRENDING from "../../../api/fetching/main/trending";
import * as actionType from "../../actiontypes/main";

function getTrending() {
  return async function (dispatch) {
    try {
      dispatch({ type: actionType.RELOG_ERROR_TRENDING });
      const response = await GETTRENDING();
      console.log(response);
      dispatch({
        type: actionType.SUCCESS_GET_TRENDING,
        payload: response.data.result,
        message: response.data.message,
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({
          type: actionType.FAILED_GET_TRENDING,
          message: error?.message,
        });
      } else {
        dispatch({
          type: actionType.FAILED_GET_TRENDING,
          message:
            error.response?.data?.message || error?.response?.data?.error,
        });
      }
    }
  };
}

export default getTrending;
