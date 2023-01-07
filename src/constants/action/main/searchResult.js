import SEARCHRESULT from "../../../api/fetching/main/searchResult";
import * as actionType from "../../actiontypes/main";

function searchResult(q) {
  return async function (dispatch) {
    try {
      const response = await SEARCHRESULT(q);
      dispatch({
        type: actionType.SUCCESS_GET_SEARCHRESULT,
        data: response.data.result,
        message: response.data.message,
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({
          type: actionType.FAILED_GET_SEARCHRESULT,
          message: error?.message,
        });
      } else {
        dispatch({
          type: actionType.FAILED_GET_SEARCHRESULT,
          message:
            error.response?.data?.message || error?.response?.data?.error,
        });
      }
    }
  };
}

export default searchResult;
