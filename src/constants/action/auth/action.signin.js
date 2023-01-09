import { SIGNIN } from "../../../api/api.auth";
import toaster from "../../../utils/toaster";
import * as actionType from "../../actiontypes/auth";

const baseUrl = process.env.REACT_APP_BASE_URL;

function signInAction(data) {
  return async function (dispatch) {
    try {
      dispatch({ type: actionType.FETCHING_SIGNIN_ACCOUNT });
      const response = await SIGNIN(data);
      toaster("success", response.data.message);
      if (response.status === 200) {
        setInterval(() => {
          window.location.href = `${baseUrl}/account/otp`;
        }, 3000);
      }
      dispatch({
        type: actionType.SUCCESS_SIGNIN_ACCOUNT,
        message: response.data.message,
      });
    } catch (error) {
      if (error.response.status === 500) {
        return toaster("error", error.response.data.error);
      } else {
        return dispatch({
          type: actionType.FAILED_SIGNIN_ACCOUNT,
          message: error.response.data.message,
          validation: error.response.data.validation,
        });
      }
    }
  };
}

export default signInAction;
