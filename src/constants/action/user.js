import { PROFILE, ROLE } from "../../api/fetching/user";
import * as actionType from "../actiontypes/user";

function getUser() {
  return async function (dispatch) {
    try {
      const response = await PROFILE();
      dispatch({
        type: actionType.SUCCESS_GET_PROFILE_USER,
        payload: response.data.user,
        message: response.data.message,
      });
    } catch (error) {
      dispatch({
        type: actionType.FAILED_GET_PROFILE_USER,
        message: error.response?.data?.message || error?.response?.data?.error,
      });
    }
  };
}

function getRole() {
  return async function (dispatch) {
    try {
      const response = await ROLE();

      dispatch({
        type: actionType.SUCCESS_GET_ROLE,
        payload: response.data.result,
        message: response.data.message,
      });
    } catch (error) {
      dispatch({
        type: actionType.FAILED_GET_ROLE,
        message: error.response?.data?.message || error?.response?.data?.error,
      });
    }
  };
}

export { getUser, getRole };
