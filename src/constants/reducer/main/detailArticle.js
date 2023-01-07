import * as main from "../../actiontypes/main";

const initialState = {
  error: false,
  success: false,
  loading: true,
  data: {},
  message: {},
};

function detailArticle(state = initialState, action) {
  switch (action.type) {
    case main.SUCCESS_GET_DETAIL_ARTICLE: {
      return {
        ...state,
        error: false,
        success: true,
        loading: false,
        data: action.payload,
        message: action.message,
      };
    }
    case main.FAILED_GET_DETAIL_ARTICLE: {
      return {
        ...state,
        error: true,
        success: false,
        loading: false,
        message: action.message,
      };
    }
    case main.CLEAR_DETAIL_ARTICLE: {
      return {
        ...state,
      };
    }

    default:
      return state;
  }
}

export default detailArticle;
