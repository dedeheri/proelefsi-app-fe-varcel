import SEARCHTERMHISOTRY from "../../../api/fetching/main/searchTermHistory";
import * as actionType from "../../actiontypes/main";

function searchTermHistoryAction() {
  return async function (dispatch) {
    try {
      const response = await SEARCHTERMHISOTRY();
      dispatch({
        type: actionType.SUCCESS_GET_SEARCHTERM_HISTORY,
        result: response.data.result,
        message: response.data.message,
      });
    } catch (error) {
      dispatch({
        type: actionType.FAILED_GET_SEARCHTERM_HISTORY,
        message: error.response?.data?.message || error?.response?.data?.error,
      });
    }
  };
}

export default searchTermHistoryAction;
