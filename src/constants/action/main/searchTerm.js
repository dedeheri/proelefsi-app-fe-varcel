import SEARCHTERM from "../../../api/fetching/main/searchTerm";
import * as actionType from "../../actiontypes/main";

function searchTerm(q) {
  return async function (dispatch) {
    try {
      dispatch({
        type: actionType.FETCHING_SEARCHTERM,
      });
      const response = await SEARCHTERM(q);
      dispatch({
        type: actionType.SUCCESS_GET_SEARCHTERM,
        payload: response.data.result,
        message: response.data.message,
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({
          type: actionType.FAILED_GET_SEARCHTERM,
          message: error?.message,
        });
      } else {
        dispatch({
          type: actionType.FAILED_GET_SEARCHTERM,
          message: error.response?.data?.term || error?.response?.data?.error,
        });
      }
    }
  };
}

export default searchTerm;
