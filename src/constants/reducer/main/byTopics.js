import * as main from "../../actiontypes/main";

const initialState = {
  error: false,
  success: false,
  loading: true,
  data: [],
  message: {},
};

function byTopics(state = initialState, action) {
  switch (action.type) {
    case main.RELOG_ERROR_BY_TOPICS_ARTICLE: {
      return {
        ...state,
        loading: true,
      };
    }
    case main.SUCCESS_GET_BY_TOPICS_ARTICLE: {
      return {
        ...state,
        error: false,
        success: true,
        loading: false,
        data: action.payload,
        message: action.message,
      };
    }
    case main.FAILED_GET_BY_TOPICS_ARTICLE: {
      return {
        ...state,
        error: true,
        success: false,
        loading: false,
        message: action.message,
      };
    }
    case main.CLEAR_BY_TOPICS_ARTICLE: {
      return {
        ...state,
        data: [],
        loading: true,
      };
    }

    default:
      return state;
  }
}

export default byTopics;
