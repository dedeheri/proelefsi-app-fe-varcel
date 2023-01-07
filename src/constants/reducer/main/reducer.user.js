import * as main from "../../actiontypes/main";

const initialState = {
  error: false,
  success: false,
  loading: true,
  result: [],
  message: {},
};

function user(state = initialState, action) {
  switch (action.type) {
    case main.SUCCESS_USER: {
      return {
        ...state,
        error: false,
        success: true,
        loading: false,
        result: action.result,
        message: action.message,
      };
    }
    case main.FAILED_USER: {
      return {
        ...state,
        error: true,
        success: false,
        loading: false,
        message: action.message,
      };
    }
    case main.CLEAR_USER: {
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

export default user;
