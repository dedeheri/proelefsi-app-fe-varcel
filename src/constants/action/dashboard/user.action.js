import { CONFIG, GETUSER } from "../../../api/fetching/user";
import * as actionType from "../../actiontypes/dashboard";

function userAction(query) {
  return async function (dispatch) {
    try {
      dispatch({ type: actionType.FETCHING_GET_ALL_USERS });
      const response = await GETUSER(query);
      dispatch({
        type: actionType.SUCCESS_GET_ALL_USERS,
        result: response.data.users,
        page: response.data.page,
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({
          type: actionType.FAILED_GET_ALL_USERS,
          message: error?.message,
        });
      } else {
        dispatch({
          type: actionType.FAILED_GET_ALL_USERS,
          message:
            error.response?.data?.message || error?.response?.data?.error,
        });
      }
    }
  };
}

function userConfigAction() {
  return async function (dispatch) {
    try {
      const response = await CONFIG();
      dispatch({
        message: response.data.message,
        type: actionType.SUCCESS_GET_ALL_USERS_CONFIG,
        result: response.data.result,
      });
    } catch (error) {
      dispatch({
        type: actionType.FAILED_GET_ALL_USERS_CONFIG,
        message: error?.response.data.error,
      });
    }
  };
}

export { userAction, userConfigAction };
