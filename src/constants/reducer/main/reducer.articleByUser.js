import * as main from "../../actiontypes/main";

const initialState = {
  error: false,
  success: false,
  loading: true,
  result: [],
  page: {},
  message: {},
};

function articleByUserReducer(state = initialState, action) {
  switch (action.type) {
    case main.FETCHING_ARTICLE_USER: {
      return {
        ...state,
        loading: true,
      };
    }
    case main.SUCCESS_ARTICLE_USER: {
      return {
        ...state,
        error: false,
        success: true,
        loading: false,
        result: action.result,
        page: action.page,
        message: action.message,
      };
    }
    case main.FAILED_ARTICLE_USER: {
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

export default articleByUserReducer;
