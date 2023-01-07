import * as main from "../../actiontypes/main";

const initialState = {
  error: false,
  success: false,
  fetching: false,
  data: "",
  message: {},
};

function notInterested(state = initialState, action) {
  switch (action.type) {
    case main.FETCHING_NOT_INTERESTED: {
      return {
        ...state,
        fetching: true,
      };
    }

    case main.SUCCESS_NOT_INTERESTED: {
      return {
        ...state,
        error: false,
        success: true,
        fetching: false,
        data: action.data,
        message: action.message,
      };
    }
    case main.FAILED_NOT_INTERESTED: {
      return {
        ...state,
        error: true,
        success: false,
        fetching: false,
        message: action.message,
      };
    }

    default:
      return state;
  }
}

export default notInterested;
