import * as actionType from "../../actiontypes/auth";

const intialState = {
  fetching: false,
  success: false,
  error: false,
  message: "",
};

function verifyEmailAccountAction(state = intialState, action) {
  switch (action.type) {
    case actionType.FETCHING_VERIFY_EMAIL_ACCOUNT: {
      return {
        ...state,
        fetching: true,
      };
    }
    case actionType.SUCCESS_VERIFY_EMAIL_ACCOUNT: {
      return {
        ...state,
        message: action.message,
        success: true,
        fetching: false,
      };
    }
    case actionType.FAILED_VERIFY_EMAIL_ACCOUNT: {
      return {
        ...state,
        message: action.message,
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

export default verifyEmailAccountAction;
