import * as actionType from "../../actiontypes/auth";

const intialState = {
  fetching: false,
  success: false,
  error: false,
  message: "",
};

function deleteAccountReducer(state = intialState, action) {
  switch (action.type) {
    case actionType.FETCHING_DELETE_ACCOUNT: {
      return {
        ...state,
        fetching: true,
      };
    }
    case actionType.SUCCESS_DELETE_ACCOUNT: {
      return {
        ...state,
        message: action.message,
        success: true,
        fetching: false,
      };
    }
    case actionType.FAILED_DELETE_ACCOUNT: {
      return {
        ...state,
        message: action.message,
        success: false,
        error: true,
        fetching: false,
      };
    }

    default:
      return intialState;
  }
}

export default deleteAccountReducer;
