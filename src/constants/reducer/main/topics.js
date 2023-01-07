import * as main from "../../actiontypes/main";

const initialState = {
  error: false,
  success: false,
  loading: true,
  data: [],
  message: {},
};

function topics(state = initialState, action) {
  switch (action.type) {
    case main.RELOG_ERROR_TOPICS: {
      return {
        ...state,
        loading: true,
      };
    }
    case main.SUCCESS_GET_TOPICS: {
      return {
        ...state,
        error: false,
        success: true,
        loading: false,
        data: action.payload,
        message: action.message,
      };
    }
    case main.FAILED_GET_TOPICS: {
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

export default topics;
