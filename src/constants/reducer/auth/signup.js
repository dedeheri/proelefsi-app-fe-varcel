import * as actionType from "../../actiontypes/auth";

const intialState = {
  fetching: false,
  success: false,
  error: false,
  validation: {},
  message: "",
};

function signUpAccount(state = intialState, action) {
  switch (action.type) {
    case actionType.FETCHING_SIGNUP_ACCOUNT: {
      return {
        ...state,
        fetching: true,
      };
    }
    case actionType.SUCCESS_SIGNUP_ACCOUNT: {
      return {
        ...state,
        message: action.message,
        success: true,
        fetching: false,
      };
    }
    case actionType.FAILED_SIGNUP_ACCOUNT: {
      return {
        ...state,
        message: action.message,
        validation: action.validation,
        success: false,
        error: true,
        fetching: false,
      };
    }
    case actionType.CLEAR_SIGNUP_ACCOUNT: {
      return {
        ...state,
        validation: {},
        message: {},
        error: false,
        fetching: false,
      };
    }

    default:
      return intialState;
  }
}

export default signUpAccount;
