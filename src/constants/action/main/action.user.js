import USER from "../../../api/fetching/main/user";
import * as actionType from "../../actiontypes/main";

function userAction(username) {
  return async function (dispatch) {
    try {
      const response = await USER(username);
      dispatch({
        type: actionType.SUCCESS_USER,
        result: response.data.user,
        message: response.data.message,
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({
          type: actionType.FAILED_USER,
          message: error?.message,
        });
      } else {
        dispatch({
          type: actionType.FAILED_USER,
          message:
            error.response?.data?.message || error?.response?.data?.error,
        });
      }
    }
  };
}

export default userAction;
