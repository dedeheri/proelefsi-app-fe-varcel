import { toast } from "react-hot-toast";
import { SIGNUP } from "../../../api/fetching";
import { getAllCookies } from "../../../utils/Cookie";
import * as actionType from "../../actiontypes/auth";

const cookie = getAllCookies();
const baseUrl = process.env.REACT_APP_BASE_URL;

function signupAction(data) {
  return async function (dispatch) {
    try {
      dispatch({ type: actionType.FETCHING_SIGNUP_ACCOUNT });
      const response = await SIGNUP(data);

      if (response.status === 200) {
        setInterval(() => {
          window.location.href = `${baseUrl}/account`;
        }, 3000);
      }

      toast.success(response.data.message, {
        style: {
          borderRadius: "10px",
          padding: "10px",
          background: cookie.theme === "dark" ? "#353535" : "#fff",
          color: cookie.theme === "dark" ? "#fff" : "#000",
        },
      });
    } catch (error) {
      if (error.response.status === 500) {
        toast.error(error.response.data.error, {
          style: {
            borderRadius: "10px",
            padding: "10px",
            background: cookie.theme === "dark" ? "#353535" : "#fff",
            color: cookie.theme === "dark" ? "#fff" : "#000",
          },
        });
      }
      dispatch({
        type: actionType.FAILED_SIGNUP_ACCOUNT,
        message: error.response.data.message,
        validation: error.response.data.validation,
      });
    }
  };
}

export default signupAction;
