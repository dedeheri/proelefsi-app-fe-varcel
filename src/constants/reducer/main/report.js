import * as main from "../../actiontypes/main";

const initialState = {
  error: false,
  success: false,
  fetching: false,
  message: "",
  validation: {},
};

function report(state = initialState, action) {
  switch (action.type) {
    case main.FETCHING_ADD_REPORT: {
      return {
        ...state,
        fetching: true,
      };
    }
    case main.SUCCESS_ADD_REPORT: {
      return {
        ...state,
        error: false,
        success: true,
        fetching: false,
        message: action.payload,
      };
    }
    case main.FAILED_ADD_REPORT: {
      return {
        ...state,
        error: true,
        success: false,
        fetching: false,
        message: action.payload,
        validation: action.validation,
      };
    }

    case main.CLEAR_ADD_REPORT: {
      return {
        ...state,
        error: false,
        success: false,
        fetching: false,
        validation: {},
      };
    }
    default:
      return state;
  }
}

export default report;
