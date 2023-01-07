import * as main from "../../actiontypes/main";

const initialState = {
  error: false,
  success: false,
  message: "",
  data: "",
  loading: true,
};

function shortLink(state = initialState, action) {
  switch (action.type) {
    case main.SUCCESS_SHORT_LINK_ARTICLE: {
      return {
        ...state,
        error: false,
        success: true,
        loading: false,
        message: action.message,
        data: action.data,
      };
    }
    case main.FAILED_SHORT_LINK_ARTICLE: {
      return {
        ...state,
        error: true,
        success: false,
        loading: false,
        message: action.message,
      };
    }

    default:
      return state;
  }
}

export default shortLink;
