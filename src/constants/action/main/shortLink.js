import SHORTLINK from "../../../api/fetching/main/shortLink";
import * as actionType from "../../actiontypes/main";

function shortLink(id) {
  return async function (dispatch) {
    try {
      const response = await SHORTLINK(id);
      dispatch({
        type: actionType.SUCCESS_SHORT_LINK_ARTICLE,
        message: response.data.message,
        data: response.data.result,
      });
    } catch (error) {
      console.log(error.response.data.message);
      if (error.code === "ERR_NETWORK") {
        dispatch({
          type: actionType.FAILED_SHORT_LINK_ARTICLE,
          message: error?.message,
        });
      } else {
        dispatch({
          type: actionType.FAILED_SHORT_LINK_ARTICLE,
          message: error.response?.data?.message,
        });
      }
    }
  };
}

export default shortLink;
