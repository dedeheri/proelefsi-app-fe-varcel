import * as actionType from "../../actiontypes/auth";

const intialState = {
  fetching: false,
  success: false,
  error: false,
  message: "",
};

function changeRoleAction(state = intialState, action) {
  switch (action.type) {
    case actionType.FETCHING_CHANGE_ROLE: {
      return {
        ...state,
        fetching: true,
      };
    }
    case actionType.SUCCESS_CHANGE_ROLE: {
      return {
        ...state,
        message: action.message,
        success: true,
        fetching: false,
      };
    }
    case actionType.FAILED_CHANGE_ROLE: {
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

export default changeRoleAction;
