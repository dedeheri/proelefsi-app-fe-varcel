import { toast } from "react-hot-toast";
import { DELETEACCOUNT } from "../../../api/fetching/auth";
import { getAllCookies } from "../../../utils/Cookie";
import * as actionType from "../../actiontypes/auth";

const cookie = getAllCookies();

function deleteAccountAction(id) {
  return async function (dispatch) {
    try {
      dispatch({ type: actionType.FETCHING_DELETE_ACCOUNT });
      const response = await DELETEACCOUNT(id);

      if (response.status === 200) {
        setInterval(() => {
          window.location.reload();
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
      toast.error(error.response.data.message, {
        style: {
          borderRadius: "10px",
          padding: "10px",
          background: cookie.theme === "dark" ? "#353535" : "#fff",
          color: cookie.theme === "dark" ? "#fff" : "#000",
        },
      });
      dispatch({
        type: actionType.FAILED_DELETE_ACCOUNT,
        message: error.response.data.message,
      });
    }
  };
}

export default deleteAccountAction;
