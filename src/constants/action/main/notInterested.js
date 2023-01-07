import { toast } from "react-hot-toast";
import NOTINTERESTED from "../../../api/fetching/main/notInterested";
import { getAllCookies } from "../../../utils/Cookie";
import * as actionType from "../../actiontypes/main";

function notInterested(id) {
  return async function (dispatch) {
    try {
      dispatch({ type: actionType.FETCHING_NOT_INTERESTED });
      const response = await NOTINTERESTED(id);

      dispatch({
        type: actionType.SUCCESS_NOT_INTERESTED,
        data: response.data.data,
        message: response.data.message,
      });

      toast.success(response.data.result, {
        style: {
          borderRadius: "10px",
          padding: "10px",
          background: getAllCookies.theme === "dark" ? "#353535" : "#fff",
          color: getAllCookies.theme === "dark" ? "#fff" : "#000",
        },
      });
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({
          type: actionType.FAILED_NOT_INTERESTED,
          message: error?.message,
        });
      } else {
        dispatch({
          type: actionType.FAILED_NOT_INTERESTED,
          message:
            error.response?.data?.message || error?.response?.data?.error,
        });
      }
    }
  };
}

export default notInterested;
