import * as main from "../../actiontypes/main";

const initialState = {
  error: false,
  success: false,
  fetching: false,
  result: [],
  message: {},
};

function searchTermHistoryReducer(state = initialState, action) {
  switch (action.type) {
    case main.SUCCESS_GET_SEARCHTERM_HISTORY: {
      return {
        ...state,
        error: false,
        success: true,
        fetching: false,
        result: action.result,
        message: action.message,
      };
    }
    case main.FAILED_GET_SEARCHTERM_HISTORY: {
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

export default searchTermHistoryReducer;
