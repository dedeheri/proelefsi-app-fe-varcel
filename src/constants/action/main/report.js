import { toast } from "react-hot-toast";
import REPORTARTICLE from "../../../api/fetching/main/report";
import { getAllCookies } from "../../../utils/Cookie";
import * as actionType from "../../actiontypes/main";

const cookie = getAllCookies();

function addReport(problem, comments, id) {
  return async function (dispatch) {
    try {
      dispatch({
        type: actionType.FETCHING_ADD_REPORT,
      });
      const response = await REPORTARTICLE(problem, comments, id);
      dispatch({
        type: actionType.SUCCESS_ADD_REPORT,
        payload: response.data.result,
        message: response.data.message,
      });

      toast.success(response.data.result, {
        style: {
          borderRadius: "10px",
          padding: "10px",
          background: cookie.theme === "dark" ? "#353535" : "#fff",
          color: cookie.theme === "dark" ? "#fff" : "#000",
        },
      });

      if (response.status === 200) {
        setInterval(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        dispatch({
          type: actionType.FAILED_ADD_REPORT,
          payload: error?.message,
        });
      } else {
        dispatch({
          type: actionType.FAILED_ADD_REPORT,
          payload: error.response?.data?.message,
        });
      }
    }
  };
}

export default addReport;
